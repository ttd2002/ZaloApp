const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const cors = require("cors");

const http = require('http').createServer(app);
const io = require("socket.io")(http)
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Chat = require("./models/message");
const phoneBookRoutes = require("./routes/phoneBookRoutes");
mongoose
    .connect("mongodb+srv://viet:1234@cluster0.4qjeg0k.mongodb.net/test")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB");
    });

app.listen(port, () => {
    console.log("Server is running on 3000");
});


app.post("/register", async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            console.log("Phone already registered");
            return res.status(400).json({ message: "Phone already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            phone,
            password: hashedPassword,
            gender: '',
            birthDate: '',
            avatar: '',
        });
        await newUser.save();
        res
            .status(200)
            .json({ message: "User registered successfully", userId: newUser._id });
    } catch (error) {
        console.log("Error registering user", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");

    return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
    try {
        const { phone, password } = req.body;

        //check if the user exists already
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(401).json({ message: "Invalid phone or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id, phone: user.phone, uName: user.name, uGender: user.gender, uBirthDate: user.birthDate, uAvatar: user.avatar }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "login failed" });
    }
});
app.get("/getUser", async (req, res) => {
    try {

        const user = await User.find();
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "failed" });
    }
});
app.get("/users/:userId/messaged", async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const messages = user.messaged;

        const messaged = await User.find({ _id: { $in: messages } });

        res.status(200).json({ messaged });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the messaged", error });
    }
});
app.get("/users/:userId/finded", async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userFinded = user.finded;

        const finded = await User.find({ _id: { $in: userFinded } });

        res.status(200).json({ finded });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving the messaged", error });
    }
});
app.post("/add-messaged", async (req, res) => {
    try {
        const { currentUserId, receiverId } = req.body;
        await User.findByIdAndUpdate(currentUserId, {
            $push: { messaged: receiverId },
        });
        await User.findByIdAndUpdate(receiverId, {
            $push: { messaged: currentUserId },
        });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: "Error add messaged", error });
    }
});
app.post("/add-finded", async (req, res) => {
    try {
        const { currentUserId, receiverId } = req.body;
        await User.findByIdAndUpdate(currentUserId, {
            $push: { finded: receiverId },
        });

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: "Error add finded", error });
    }
});
var users = [];
io.on("connection", (socket) => {
    socket.on("connected", (userID) => {
        users[userID] = socket.id;

    })
    socket.on("sendMessage", async (data) => {
        try {
            const { senderId, receiverId, message } = data;
            console.log("data", data);
            const newMessage = new Chat({ senderId, receiverId, message });
            await newMessage.save();
            //emit the message to the receiver
            io.to(users[receiverId]).emit("receiveMessage", newMessage);
        } catch (error) {
            console.log("Error handling the messages");
        }
        socket.on("disconnet", () => {
            console.log("user disconnected");
        });
    });
});

http.listen(8000, () => {
    console.log("Socket.IO server is running on port 8000")
})

app.get("/messages", async (req, res) => {
    try {
        const { senderId, receiverId } = req.query;
        const messages = await Chat.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        }).populate("senderId", "_id name");

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error in getting messages", error });
    }
});
app.put("/users/:userId/editProfile", async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, gender, birthDate } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { name: name, gender: gender, birthDate: birthDate } }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res
            .status(200)
            .json({ message: "updated succesfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error edit" });
    }
});

app.put("/users/:userId/editAvatar", async (req, res) => {
    try {
        const { userId } = req.params;
        const { avatar} = req.body;
        const base64Avatar = Buffer.from(avatar).toString("base64");

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: { avatar: avatar} }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res
            .status(200)
            .json({ message: "updated succesfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error edit" });
    }
});
//routes của phone book
app.use("/phonebook", phoneBookRoutes);
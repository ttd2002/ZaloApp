const express = require("express");
const router = express.Router();
const User = require("../models/user2");

router.get("/:userId/friends", async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId).populate("listFriend", ["name","phone"]);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ friends: user.listFriend });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user's friends", error });
    }
  });

module.exports = router;

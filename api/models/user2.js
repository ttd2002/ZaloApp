const mongoose = require("mongoose");
//Tạo tạm test dữ liệu
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  listFriend: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User2",
    },
  ],
  
});


const User = mongoose.model("User2",userSchema);

module.exports = User
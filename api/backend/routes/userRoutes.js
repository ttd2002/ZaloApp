const express = require("express");
const router = express.Router();
require("dotenv").config();

const { getUser, getFinded, getMessaged, addMessaged, addFinded, editProfile, editAvatar, changePassword, getFriendsByUser } = require("../controllers/userController");

router.get("/getUser", getUser);
router.get("/:userId/finded", getFinded);
router.get("/:userId/messaged", getMessaged);
router.post("/add-messaged", addMessaged);
router.post("/add-finded", addFinded);
router.put("/:userId/editProfile", editProfile);
router.put("/:userId/editAvatar", editAvatar);
router.put("/changePassword", changePassword);
router.get("/:userId/friends", getFriendsByUser);

module.exports = router;
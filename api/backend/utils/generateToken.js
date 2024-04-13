const crypto = require("crypto");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
};

const secretKey = generateSecretKey();

module.exports = {
    jwt,secretKey
};
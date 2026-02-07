require("dotenv").config();
const jwt = require("jsonwebtoken");

const createSecretToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_KEY , {
        expiresIn: 3*24*60*60,
    });
};

const createRoleSecretToken = (role) => {
    return jwt.sign({role}, process.env.ROLE_KEY , {
        expiresIn: 24*60*60, // token sirf second smjhta hai.
    });
};

module.exports = {createSecretToken, createRoleSecretToken};
const shopkeeperModel = require("../models/ShopkeeperModel.js");
const { createSecretToken, createRoleSecretToken } = require("../utils/secretToken.js");
const bcrypt = require("bcrypt");
const validateSignupData = require("../validation/validateData.js");

const Signup = async (req, res, next) => {

    try {
        const { ShopName, Name, Email, Password } = req.body;
        if (!Name || !ShopName || !Email || !Password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const validationRes = validateSignupData(req.body);
        if (validationRes.error) {
            return res.json({ success: false, message: validationRes.error.details[0].message })
        }
        const existingShopkeeper = await shopkeeperModel.findOne({ Email });

        if (existingShopkeeper) {
            return res.status(409).json({ success: false, message: "Shopkeeper already exists" });
        }

        const shopkeeper = new shopkeeperModel({ ShopName, Name, Email, Password });
        await shopkeeper.save();

        const token = createSecretToken(shopkeeper._id);
        const roleToken = createRoleSecretToken("shopkeeper");


        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1 * 24 * 60 * 60 * 1000, // cookie ms mein work krta hai.
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });
        res.cookie("role", roleToken, {
            httpOnly: true,
            maxAge: 1 * 24 * 60 * 60 * 1000,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });
        res.status(201).json({ message: "User signed in successfully", success: true, shopkeeper });
        next();
    }
    catch (error) {
        console.error(error);
    }
};

const Login = async (req, res, next) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
        return res.json({ message: "All fields are required" });
    }
    const shopkeeper = await shopkeeperModel.findOne({ Email });
    if (!shopkeeper) {
        return res.json({ message: "Incorrect Password or Email" });
    }
    const auth = await bcrypt.compare(Password, shopkeeper.Password);

    if (!auth) {
        return res.json({ message: "Incorrect Password or Email" });
    }
    const token = createSecretToken(shopkeeper._id);
    const roleToken = createRoleSecretToken("shopkeeper");

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000, // cookie ms mein work krta hai.
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    });
    res.cookie("role", roleToken, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    });
    res.status(201).json({ message: `Welcome ${shopkeeper.Name} logged in successfully`, success: true });

    next();
}


const Logout = (req, res) => {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none":"lax",
    });
    res.clearCookie("role", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    });
    res.json({ status: true, message: "Logout Successfully" });
}

module.exports = { Signup, Login, Logout };
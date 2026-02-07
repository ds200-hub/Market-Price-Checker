const jwt = require("jsonwebtoken");
const shopkeeperModel = require("../models/ShopkeeperModel");
require("dotenv").config();

const userVerification = (req, res) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.json({ status: false, message: "Please Login Or SignUp Again" });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false, message: "Please Login Or SignUp Again" });
        }
        else {
            // data only id hold krta hai.
            const shopkeeper = await shopkeeperModel.findById(data.id);
            if (shopkeeper) {
                return res.json({ status:true, message: `Welcome ${shopkeeper.Name}` });
            }
            else return res.json({ status: false, message: "Please Login Or SignUp Again" });
        }
    })
}

const roleVerification = (req, res) => {
    const roleToken = req.cookies.role;
    if(!roleToken){
        return res.json({role : "guest"});
    }
    jwt.verify(roleToken, process.env.ROLE_KEY, async (err, data) => {
        if (err) {
            return res.json({role: "guest"});
        }
        else{
            return res.json({role: "shopkeeper"});
        }
    });
}

module.exports = { userVerification, roleVerification };   
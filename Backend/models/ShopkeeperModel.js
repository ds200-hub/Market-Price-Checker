const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const shopkeeperSchema = new Schema({
    ShopName: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),

    }
})

shopkeeperSchema.pre("save", async function (){
    if(!this.isModified("Password")) return ;

    try{
        this.Password = await bcrypt.hash(this.Password, 12);
    }
    catch(error){
        console.error(error);
    }
});

const shopkeeperModel = mongoose.model("shopkeeper", shopkeeperSchema);

module.exports = shopkeeperModel;
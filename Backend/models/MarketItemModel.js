const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MarketItemSchema = new Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    itemNameLower: {
    type: String,
    required: true,
    unique: true
  },
    imageUrl: {
        type: String,
        required: true,
        unique: true
    },
    imagePublicId: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    previousPrice: {
        type: Number,
        default: 0
    }

});

MarketItemModel = mongoose.model("MarketItem", MarketItemSchema);

module.exports = MarketItemModel;
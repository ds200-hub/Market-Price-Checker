const { required, date } = require("joi");
const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const PriceHistorySchema = new Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MarketItem",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    }

});

const PriceHistoryModel = mongoose.model("PriceHistory", PriceHistorySchema);

module.exports = PriceHistoryModel;
const MarketItemModel = require("../models/MarketItemModel.js");
const MarketItem = async (req, res) => {
    try {
        const items = await MarketItemModel.find();
        return res.status(200).json({
            success: true,
            data: items
        });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { MarketItem };
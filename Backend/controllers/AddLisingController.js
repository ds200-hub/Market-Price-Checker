const MarketItemModel = require("../models/MarketItemModel.js");

const addItemListing = async (req, res) => {
    const { itemName, price } = req.body;
    if (!itemName || !price || !req.file) {
        return res.json({ success: false, message: "All fields are requried" });
    }
    const displayName = itemName.trim();
    const lowerName = itemName.trim().toLowerCase();

    const item = await MarketItemModel.findOne({ itemNameLower: lowerName });

    if (item) {
        return res.json({ success: false, message: `A item already exists with itemName ${item.itemName}` });
    }
    let newMarketItem = new MarketItemModel({
        itemName: displayName,
        itemNameLower: lowerName,
        price: price,
        imageUrl: req.file.path,
        imagePublicId: req.file.filename.replace("demo/", "")
    });
    const savedItem = await newMarketItem.save();
    console.log(savedItem);
    return res.status(200).json({ success: true, message: "item is successfully added" });
}

module.exports = { addItemListing };

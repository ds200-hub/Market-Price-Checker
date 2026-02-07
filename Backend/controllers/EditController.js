const MarketItemModel = require("../models/MarketItemModel.js");

const Edit = async (req, res) => {
    const { id } = req.params;
    try {
        const itemData = await MarketItemModel.findById(id);
        return res.status(200).json({ data: itemData, success: true });
    }
    catch (error) {
        console.log(error);
    }
}

const itemUpdate = async (req, res) => {
    const { id } = req.params;
    let { price, itemName } = req.body;

    const displayName = itemName.trim();
    const lowerName = itemName.trim().toLowerCase();

    if (price === "") {
        price = 0;
    }
    price = Number(price);
    try {

        const item = await MarketItemModel.findById(id);

        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        item.previousPrice = item.price;
        item.price = price;
        item.itemName = displayName;
        item.itemNameLower = lowerName;

        if (req.file && req.file.path) {
            item.imageUrl = req.file.path;
            item.imagePublicId = req.file.filename.replace("demo/", "");
        }

        const savedItem = await item.save();
        console.log(savedItem);

        return res.status(200).json({ success: true, message: "Item Updated Successfully", data: item });
    }
    catch (error) {
        console.log(error);
    }

}

module.exports = { Edit, itemUpdate };
const PriceHistoryModel = require("../models/PriceHistoryModel");
const MarketItemModel = require("../models/MarketItemModel");

const PlotGraph = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await PriceHistoryModel.find({ item_id: id }).sort({ date: 1 });
        if (item.length > 7) {
            const deleteId = item[0]._id;
            const deleteItem = await PriceHistoryModel.findByIdAndDelete(deleteId);
        }
        const {itemName} = await MarketItemModel.findById(id);
        const updatedItems = await PriceHistoryModel.find({ item_id: id }).sort({ date: 1 });
        return res.json({ success: true, priceData: updatedItems, itemName: itemName });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = PlotGraph;
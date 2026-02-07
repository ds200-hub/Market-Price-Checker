const { cloudinary } = require("../cloudConfig.js");
const MarketItemModel = require("../models/MarketItemModel.js");

const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await MarketItemModel.findById(id);
        if(item.imagePublicId){
            await cloudinary.uploader.destroy(`demo/${item.imagePublicId}`);
        }
        const deleItem = await MarketItemModel.findByIdAndDelete(id);
        return res.status(200).json({success: true, id: deleItem._id, message: `${deleItem.itemName} is Successfully Deleted`});
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({success: false, message: "server problem Please try again!"}); 
    }
}

module.exports = deleteItem;
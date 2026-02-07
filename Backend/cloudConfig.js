require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "demo",
        allowedFormats: ["jpg", "png", "jpeg"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        public_id: async (req, file) => {
            if (req.params.id) {
                const existingItem = await MarketItemModel.findById(req.params.id);
                return existingItem.imagePublicId;
            }
            else {
                return `item_${Date.now()}`;
            }
        }
    },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };



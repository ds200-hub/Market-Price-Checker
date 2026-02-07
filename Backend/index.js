require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/AuthRoute.js");
const shopkeeperModel = require("./models/ShopkeeperModel.js");
const MarketItemModel = require("./models/MarketItemModel.js");
const cookieParser = require("cookie-parser");


const app = express();

const PORT = process.env.PORT || 8000;
const url = process.env.MONGO_URL;


const allowedOrigin = [
    "http://localhost:5173",
    "https://market-price-checker-omega.vercel.app",
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigin.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.post("/upload", async (req, res) => {
    tempItems = [
        {
            "itemName": "Carrot",
            "imageUrl": "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg",
            "price": 45,
            "previousPrice": 0
        },
        {
            "itemName": "Tomato",
            "imageUrl": "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg",
            "price": 40,
            "previousPrice": 0
        },
        {
            "itemName": "Potato",
            "imageUrl": "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg",
            "price": 30,
            "previousPrice": 0
        },
        {
            "itemName": "Onion",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/25/Onion_on_White.JPG",
            "price": 35,
            "previousPrice": 0
        },
        {
            "itemName": "Broccoli",
            "imageUrl": "https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg",
            "price": 50,
            "previousPrice": 0
        },
        {
            "itemName": "Spinach",
            "imageUrl": "https://images.pexels.com/photos/6824475/pexels-photo-6824475.jpeg",
            "price": 25,
            "previousPrice": 0
        },
        {
            "itemName": "Capsicum",
            "imageUrl": "https://images.pexels.com/photos/2893635/pexels-photo-2893635.jpeg",
            "price": 60,
            "previousPrice": 0
        },
        {
            "itemName": "Cucumber",
            "imageUrl": "https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg",
            "price": 30,
            "previousPrice": 0
        },
        {
            "itemName": "Brinjal",
            "imageUrl": "https://images.pexels.com/photos/34346365/pexels-photo-34346365.jpeg",
            "price": 45,
            "previousPrice": 0
        },
        {
            "itemName": "Zucchini",
            "imageUrl": "https://images.pexels.com/photos/3375263/pexels-photo-3375263.jpeg",
            "price": 50,
            "previousPrice": 0
        },
        {
            "itemName": "Cauliflower",
            "imageUrl": "https://images.pexels.com/photos/6065185/pexels-photo-6065185.jpeg",
            "price": 50,
            "previousPrice": 0
        },
        {
            "itemName": "Lettuce",
            "imageUrl": "https://images.pexels.com/photos/89267/pexels-photo-89267.jpeg",
            "price": 40,
            "previousPrice": 0
        },
        {
            "itemName": "Radish",
            "imageUrl": "https://images.pexels.com/photos/7214603/pexels-photo-7214603.jpeg",
            "price": 25,
            "previousPrice": 0
        },
        {
            "itemName": "Beetroot",
            "imageUrl": "https://images.pexels.com/photos/29436276/pexels-photo-29436276.jpeg",
            "price": 45,
            "previousPrice": 0
        },
        {
            "itemName": "Asparagus",
            "imageUrl": "https://images.pexels.com/photos/2069280/pexels-photo-2069280.jpeg",
            "price": 70,
            "previousPrice": 0
        },
        {
            "itemName": "Lemon",
            "imageUrl": "https://images.pexels.com/photos/129574/pexels-photo-129574.jpeg",
            "price": 30,
            "previousPrice": 0
        },
        {
            "itemName": "Mushroom",
            "imageUrl": "https://images.pexels.com/photos/36438/mushrooms-brown-mushrooms-cook-eat.jpg",
            "price": 60,
            "previousPrice": 0
        },
        {
            "itemName": "Garlic",
            "imageUrl": "https://images.pexels.com/photos/928251/pexels-photo-928251.jpeg",
            "price": 120,
            "previousPrice": 0
        },
        {
            "itemName": "Ginger",
            "imageUrl": "https://images.pexels.com/photos/1337585/pexels-photo-1337585.jpeg",
            "price": 90,
            "previousPrice": 0
        },
        {
            "itemName": "Sweet Potato",
            "imageUrl": "https://images.pexels.com/photos/7456548/pexels-photo-7456548.jpeg",
            "price": 35,
            "previousPrice": 0
        }
    ];

    tempItems.map((item) => {
        let newMarketItem = new MarketItemModel({
            itemName: item.itemName,
            imageUrl: item.imageUrl,
            price: item.price
        });
        newMarketItem.save();
    });
    res.send("WORKING");


//     await MarketItemModel.deleteMany({});
//     res.send("working");
})

app.use("/", authRoute);

app.listen(PORT, async () => {
    console.log("server is listing");
    const connectionDB = await mongoose.connect(url);
    console.log("connected to database");
});
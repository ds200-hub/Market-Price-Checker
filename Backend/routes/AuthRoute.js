const { Signup, Login, Logout } = require("../controllers/AuthControllers.js");
const { userVerification, roleVerification } = require("../middlewares/userVerification.js");
const { MarketItem } = require("../controllers/MarketItemController.js");
const { Edit, itemUpdate } = require("../controllers/EditController.js");
const {addItemListing} = require("../controllers/AddLisingController.js");
const deleteItem = require("../controllers/DeleteItemController.js");
const router = require("express").Router();

const { upload } = require("../cloudConfig.js");

router.post("/Signup", Signup);
router.post("/Login", Login);
router.post("/Logout", Logout);
router.post("/Verify", userVerification);
router.post("/verifyRole", roleVerification);
router.get("/marketItems", MarketItem);
router.post("/marketItems/addItemListing",upload.single('image'), addItemListing);
router.get("/marketItems/EditPrice/:id", Edit);
router.put("/marketItems/EditPrice/item-price-update/:id", upload.single('image'), itemUpdate);
router.delete("/marketItems/deleteItem/:id", deleteItem )
module.exports = router;
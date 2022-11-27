const router = require("express").Router();
const Item = require("../models/item");
const auth = require("../middleware/auth");

const {
  addItem,
  getItems,
  updateItem,
  getMyItem,
  deleteItem,
  getSavedItem,
  getItembyID,
} = require("../controllers/itemController");

//Fileupload ----remaining----

router.post("/", auth, addItem);
router.get("/", getItems);
router.get("/:id", getItembyID);

module.exports = router;

const router = require("express").Router();
const Item = require("../models/item");
const auth = require("../middleware/auth");
const {
  addItem,
  getItem,
  updateItem,
  getMyItem,
  deleteItem,
  getSavedItem,
  uplaodImage,
  getItembyID,
} = require("../controllers/itemController");

//Fileupload ----remaining----

//const fs = require("fs")

router.post("/", auth, addItem);
router.get("/", getItem);
router.post("/:id", auth, updateItem);
router.get("/:id", au);
router.get("/:id", auth, getItembyID);
router.get("/me", auth, getMyItem);
router.delete("/:id", auth, deleteItem);

module.exports = router;

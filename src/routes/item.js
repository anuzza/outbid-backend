const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  addItem,
  getItems,
  deleteItem,
  getItembyID,
  markItemAsSold,
} = require("../controllers/itemController");

//Fileupload ----remaining----

router.post("/", auth, addItem);
router.post("/markAsSold/:id", auth, markItemAsSold);
router.get("/", getItems);
router.get("/:id", getItembyID);
router.delete("/:id", auth, deleteItem);

module.exports = router;

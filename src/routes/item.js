const router = require("express").Router();
const Item = require("../models/item");
const auth = require("../middleware/auth");
const { addItem } = require("../controllers/itemController");

//Fileupload ----remaining----

//const fs = require("fs")

router.post("/", addItem);

module.exports = router;

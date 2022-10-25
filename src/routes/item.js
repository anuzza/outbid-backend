const router = require("express").Router();
const postItem = require("../controllers/itemController");

router.post("/post", postItem);

module.exports = router;
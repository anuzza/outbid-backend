const router = require("express").Router();
const auth = require("../middleware/auth");
const { addBids } = require("../controllers/bidController");

router.post("/", auth, addBids);

module.exports = router;

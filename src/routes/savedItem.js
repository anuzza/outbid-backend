const { toggleSavedItem } = require("../controllers/savedItemController");
const auth = require("../middleware/auth");
const router = require("express").Router();

router.post("/:id", auth, toggleSavedItem);

module.exports = router;

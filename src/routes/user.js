const router = require("express").Router();
const { signupUser, loginUser } = require("../controllers/userController");

router.post("/", signupUser);
router.post("/login", loginUser);

module.exports = router;

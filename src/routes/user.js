const router = require("express").Router();
const {
  signupUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.post("/", signupUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);

module.exports = router;

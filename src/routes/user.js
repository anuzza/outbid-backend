const router = require("express").Router();
const {
  signupUser,
  loginUser,
  logoutUser,
  getLoggedInUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/", signupUser);
router.post("/login", loginUser);
router.delete("/logout", auth, logoutUser);
router.get("/me", auth, getLoggedInUser);

module.exports = router;

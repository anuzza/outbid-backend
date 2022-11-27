const router = require("express").Router();
const {
  signupUser,
  loginUser,
  logoutUser,
  getLoggedInUser,
  getMyBids,
  getMyItems,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/", signupUser);
router.post("/login", loginUser);
router.delete("/logout", auth, logoutUser);
router.get("/me", auth, getLoggedInUser);
router.get("/bids", auth, getMyBids);
router.get("/items", auth, getMyItems);

module.exports = router;

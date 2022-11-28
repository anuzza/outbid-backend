const router = require("express").Router();
const {
  signupUser,
  loginUser,
  logoutUser,
  getLoggedInUser,
  getMyBids,
  getMyItems,
  getMySavedItems,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/", signupUser);
router.post("/login", loginUser);
router.delete("/logout", auth, logoutUser);
router.get("/me", auth, getLoggedInUser);
router.get("/bids", auth, getMyBids);
router.get("/items", auth, getMyItems);
router.get("/saved-items", auth, getMySavedItems);

module.exports = router;

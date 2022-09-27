const router = require("express").Router();

router.post("/", signupUser);
router.post("/login", loginUser);

module.exports = router;

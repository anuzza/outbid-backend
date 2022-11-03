const express = require("express");
const router = new express.Router();
const Item = require('../models/item');
const auth = require("../middleware/auth");


//Fileupload ----remaining----

//const fs = require("fs")

router.post('./',auth, addItem );






module.exports = router;

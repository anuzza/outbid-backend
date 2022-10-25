const Item = require("../models/item");
const User = require("../models/user");

// General order of code is 
// 1. models (defines how info is organized, and how if is retrieved)
// 2. then, ___Controller, defines methods/functions for input/output
// 3. then, routes, which connects methods/functions from __Controller to "URL's"/paths  to backend index, which is where backend listens for frontend


// WIP: Jeremy
const postItem = async (req, res) => {
    try {
      const item = new Item(req.body);
      await item.save();
      console.log("here" + item);
      res.status(201).send({ item });
    } catch (error) {
      const item = new Item(req.body);
      console.log(item);
      res.status(400).send({ error: error.message });
    }
  };
  
module.exports = postItem;
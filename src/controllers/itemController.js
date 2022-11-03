const jwt = require("jsonwebtoken");
const Item = require("../models/item");

const addItem = async (req, res) => {
  try {
    let newItem = new Item({ ...req.body, creator: req.user });
  } catch (error) {}
};

module.exports = {
  addItem,
};

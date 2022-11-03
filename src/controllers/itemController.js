const jwt = require("jsonwebtoken");
const Item = require("../models/item");
const UserItem = require("../models/userItem");

const addItem = async (req, res) => {
  try {
    let newItem = new Item({ ...req.body, creator: req.user });
    newItem = await newItem.save();
    const userItem = await new UserItem({
      user: req.user,
      item: newItem,
    });
    await userItem.save();
    res.send(newItem);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  addItem,
};

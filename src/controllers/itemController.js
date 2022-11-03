const jwt = require("jsonwebtoken");
const Item = require("../models/item");
const UserItem = require("../models/userItem");

const addItem = async (req, res) => {
  try {
    console.log(req.body);
    let newItem = new Item(req.body);
    newItem = await newItem.save();
    // const userItem = new UserItem({
    //   user: req.user,
    //   item: newItem,
    // });
    // await userItem.save();
    res.status(200).send(newItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addItem,
};

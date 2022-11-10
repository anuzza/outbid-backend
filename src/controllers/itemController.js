const jwt = require("jsonwebtoken");
const Item = require("../models/item");
const UserItem = require("../models/userItem");
const upload = fileUpload("user");
const AmazonS3URI = require("amazon-s3-uri");
const deleteFile = require("../utils/deleteFile");

const fs = require("fs");
const userItem = require("../models/userItem");

const getItem = async (req, res) => {
  try {
    const items = await Item.find({ active: true });
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addItem = async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    let newItem = new Item({ ...req.body, creator: req.user });
    newItem = await newItem.save();
    res.status(200).send(newItem);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateItem = async (req, res) => {};

const getMyItem = async (req, res) => {};
const deleteItem = async (req, res) => {};
const getSavedItem = async (req, res) => {};

const uplaodImage = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return res.status(400).send({
      err: "No such item found",
    });
  }
  item.images = req.file.location;
  await item.save();
  res.send();
};

const getItembyID = async (req, res) => {};

module.exports = {
  addItem,
  getItem,
  updateItem,
  getMyItem,
  deleteItem,
  getSavedItem,
  uplaodImage,
};

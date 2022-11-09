const jwt = require("jsonwebtoken");
const Item = require("../models/item");
const UserItem = require("../models/userItem");
const upload = fileUpload("user");
const AmazonS3URI = require("amazon-s3-uri");
const deleteFile = require("../utils/deleteFile");

const fs = require("fs");
const userItem = require("../models/userItem");

const getItem = async (req, res) => {};

const addItem = async (req, res) => {
  try {
    let newItem = new Item(req.body);
    newItem = await newItem.save();
    // const userItem = new UserItem({
    //   user: req.user,
    //   item: newItem,
    // });
    // await userItem.save();
    res.status(200).send(newItem);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
const updateItem = async (req, res) => {};
const getMyItem = async (req, res) => {};
const deleteItem = async (req, res) => {};
const getSavedItem = async (req, res) => {};
const uplaodImage = async (req, res) => {};
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

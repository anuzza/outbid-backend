const Item = require("../models/item");
const UserItem = require("../models/userItem");
const AmazonS3URI = require("amazon-s3-uri");
const fileUpload = require("../services/multer");
const deleteFile = require("../services/deleteFile");
const sendError = require("../utils/error");

const upload = fileUpload();
const multiUpload = upload.array("files", 3);

const getItems = async (req, res) => {
  try {
    const items = await Item.find({ sold: false });
    res.send(items);
  } catch (error) {
    sendError(res, 400, error);
  }
};

const addItem = async (req, res) => {
  try {
    multiUpload(req, res, async function (err) {
      if (err) {
        if (err.message && err.message === "File too large") {
          err.errMessage = "File size cannot be larger than 2 MB";
        }
        return sendError(res, 403, err);
      }
      if (req.files.length !== 0) {
        const item = new Item({
          ...req.body,
          creator: req.user,
        });

        for (let i = 0; i < req.files.length; i++) {
          item.images.push(req.files[i].location);
        }
        await item.save();
        return res.send(item);
      } else {
        return sendError(res, 400, new Error("Please upload at least 1 image!"));
      }
    });
  } catch (error) {
    sendError(res, 500, error);
  }
};

const updateItem = async (req, res) => {};

const getMyItem = async (req, res) => {};
const deleteItem = async (req, res) => {};
const getSavedItem = async (req, res) => {};

// const uploadImage = async (req, res) => {
//   const item = await Item.findById(req.params.id);
//   if (!item) {
//     return res.status(400).send({
//       err: "No such item found",
//     });
//   }
//   //item.images = req.file.location;
//   await item.save();
//   res.send();
// };

const getItembyID = async (req, res) => {};

module.exports = {
  addItem,
  getItems,
  updateItem,
  getMyItem,
  deleteItem,
  getSavedItem,
  // uploadImage,
};

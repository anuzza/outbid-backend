const Item = require("../models/item");
const fileUpload = require("../services/multer");
const sendError = require("../utils/error");

const upload = fileUpload();
const multiUpload = upload.array("files", 3);

const getItems = async (req, res) => {
  try {
    const items = await Item.find({
      end_date: {
        $gte: new Date(),
      },
    });
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
          current_bid: req.body.starting_amount,
        });

        for (let i = 0; i < req.files.length; i++) {
          item.images.push(req.files[i].location);
        }
        await item.save();
        return res.send(item);
      } else {
        return sendError(
          res,
          400,
          new Error("Please upload at least 1 image!")
        );
      }
    });
  } catch (error) {
    sendError(res, 500, error);
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      sendError(res, 400, new Error("Item doesn't exist!"));
      return;
    }
    await item.remove();
    res.send();
  } catch (error) {
    sendError(res, 500, error);
  }
};

const getItembyID = async (req, res) => {
  const now = new Date();

  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      sendError(res, 404, new Error("Item doesn't exist!"));
      return;
    }
    res.send(item);
  } catch (error) {
    sendError(res, 500, error);
  }
};

const markItemAsSold = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      sendError(res, 404, new Error("Item doesn't exist!"));
      return;
    }
    if (!item.winner || item?.winner?.toString() !== req.user._id.toString()) {
      sendError(res, 404, new Error("You cannot buy this item!!"));
      return;
    }
    item.sold = true;
    await item.save();
    res.send();
  } catch (error) {
    sendError(res, 500, error);
  }
};

module.exports = {
  addItem,
  getItems,
  deleteItem,
  getItembyID,
  markItemAsSold,
};

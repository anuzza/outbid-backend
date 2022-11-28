const Item = require("../models/item");
const SavedItem = require("../models/savedItem");
const sendError = require("../utils/error");

const toggleSavedItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      sendError(res, 404, new Error("Item does not exist!"));
      return;
    }

    // if (item.creator.toString() === req.user._id.toString()) {
    //   sendError(
    //     res,
    //     401,
    //     new Error("You are not allowed to save your own item!")
    //   );
    //   return;
    // }

    let savedItem = await SavedItem.findOne({
      user: req.user,
      item,
    });
    if (savedItem) {
      await savedItem.remove();
    } else {
      savedItem = new SavedItem({
        user: req.user,
        item,
      });
      await savedItem.save();
    }
    res.send();
  } catch (error) {
    sendError(res, 500, error);
  }
};

module.exports = {
  toggleSavedItem,
};

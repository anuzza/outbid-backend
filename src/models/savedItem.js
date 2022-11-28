const mongoose = require("mongoose");

const savedItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SavedItem = mongoose.model("SavedItem", savedItemSchema);
module.exports = SavedItem;

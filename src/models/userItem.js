const mongoose = require("mongoose");

const userItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  },
  {
    timestamps: true,
  }
);

const UserItem = mongoose.model("userItem", userItemSchema);
module.exports = UserItem;

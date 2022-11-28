const mongoose = require("mongoose");
const deleteFile = require("../services/deleteFile");
const Bid = require("./bid");
const SavedItem = require("./savedItem");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    starting_amount: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: ["NEW", "USED"],
      required: true,
    },

    current_bid: {
      type: Number,
      default: 0,
    },

    sold: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

itemSchema.pre("remove", async function (next) {
  const item = this;
  const db = this.db;
  await db.transaction(async function (session) {
    for (image of item.images) {
      deleteFile(image);
    }
    await db.model("Bid").deleteMany({ item }).session(session);
    await db.model("SavedItem").deleteMany({ item }).session(session);
  });

  // await Bid.deleteMany({
  //   item,
  // });
  // await SavedItem.deleteMany({
  //   item,
  // });
  next();
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;

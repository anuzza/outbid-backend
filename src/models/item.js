const mongoose = require("mongoose");
const UserItem = require("../models/userItem");

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
    starting_amount: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: ["NEW", "USED"],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
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
        image: {
          type: String,
        },
      },
    ],
    bids: [
      {
        amount: {
          type: Number,
          required: true,
        },
        bidder: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        bidded_at: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    toJSON: true,
    timestamps: true,
  }
);

itemSchema.pre("remove", async function (next) {
  const item = this;
  await UserItem.deleteMany({
    item: item,
  });
  next();
});

itemSchema.pre("save", async function (next) {
  const item = this;

  if (item.isModified("description")) {
    let des = item.description;

    if (des.includes("\n")) {
      des = des.replace(/\n/g, "");
    }

    item.description = des;
  }

  next();
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;

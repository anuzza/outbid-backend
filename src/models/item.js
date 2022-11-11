const mongoose = require("mongoose");
const UserItem = require("./userItem");

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

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;

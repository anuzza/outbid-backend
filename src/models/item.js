const mongoose = require("mongoose");

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
    condition: {
      type: String,
      enum: ["NEW", "USED"],
      required: true,
    },
    starting_amount: {
      type: Number,
      required: true,
    },
    current_bid: {
      type: Number,
      default: 0,
    },
    open_bid: {
      type: Boolean,
      default: true,
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

const Item = mongoose.model("Item", itemSchema);
module.exports = Recipe;

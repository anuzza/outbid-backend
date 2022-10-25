const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      enum: ["NEW", "USED"],
      required: true,
    },
    start_bid: {
      type: Number,
      required: true,
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
//      required: true,
      default: null,
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

itemSchema.methods.toJSON = function () {
  const item = this;
  const itemObject = item.toObject();
  console.log(itemObject);
  return itemObject;
};

itemSchema.statics.findByName = async (product_name) => {
  const item = await item.findOne({ product_name });
  if (!item) {
    throw new Error("No matching item found.");
  }
  return item;
};

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
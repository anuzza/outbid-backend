const mongoose = require("mongoose");
const Item = require("./item");

const bidSchema = new mongoose.Schema(
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

bidSchema.pre("save", async function (next) {
  await Item.updateOne({ _id: this.item }, { current_bid: this.amount });
  next();
});

const Bid = mongoose.model("Bid", bidSchema);
module.exports = Bid;

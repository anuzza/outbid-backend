const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
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
    required: true,
  },
  starting_amount: {
    type: Number,
    required: true,
  },
  current_bid: {
    type: Number,
    required: true,
  },
  open_bid: {
    type: Boolean,
    default: false,
  },
  sold: {
    type: Boolean,
    default: false,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  winner: {
    type: String,
  },
  images: [
    {
      image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "image",
      },
      source_url: {
        type: String,
      },
    },
  ],
});

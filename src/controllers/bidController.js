const Bid = require("../models/bid");
const Item = require("../models/item");
const sendError = require("../utils/error");

const addBids = async (req, res) => {
  try {
    const item = await Item.findById(req.body.itemId);
    if (!item) {
      throw new Error("Item does not exist");
    }

    if (req.user._id.toString() === item.creator.toString()) {
      throw new Error("You're not allowed to bid on this item!");
    }

    // const exists = await Bid.findOne({
    //   bidder: req.user,
    //   item: req.body.itemId,
    // });
    // if exists{

    // }

    if (item.current_bid >= req.body.amount) {
      throw new Error("Your bid must be greater than current bid!");
    }

    const bid = new Bid({
      amount: req.body.amount,
      bidder: req.user,
      item: req.body.itemId,
    });
    await bid.save();
    res.send(bid);
  } catch (error) {
    sendError(res, 500, error);
  }
};
module.exports = { addBids };

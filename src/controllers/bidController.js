const Bid = require("../models/bid");
const Item = require("../models/item");
const sendError = require("../utils/error");
const { startSession } = require("mongoose");

const addBids = async (req, res) => {
  const now = new Date();
  const session = await startSession();
  try {
    session.startTransaction();
    const item = await Item.findById(req.body.itemId);
    if (!item) {
      await session.abortTransaction();
      session.endSession();
      sendError(res, 400, new Error("Item does not exist!"));
      return;
    }

    if (req.user._id.toString() === item.creator.toString()) {
      await session.abortTransaction();
      session.endSession();
      sendError(res, 401, new Error("You're not allowed to bid on this item!"));
      return;
    }

    if (now >= item?.end_date.getTime()) {
      await session.abortTransaction();
      session.endSession();
      sendError(res, 401, new Error("Auction has already ended!"));
      return;
    }
    if (item.current_bid >= req.body.amount) {
      await session.abortTransaction();
      session.endSession();
      sendError(
        res,
        401,
        new Error("Your bid must be greater than current bid!")
      );
      return;
    }

    let bid = await Bid.findOne({
      item,
      bidder: req.user,
    });

    if (bid) {
      bid.amount = req.body.amount;
      await bid.save({ session });
    } else {
      bid = new Bid({
        amount: req.body.amount,
        bidder: req.user,
        item: req.body.itemId,
      });
      await bid.save({ session });
    }

    //update item current bid
    item.current_bid = bid.amount;
    item.winner = bid.bidder;
    await item.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.send(bid);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    sendError(res, 500, error);
  }
};
module.exports = { addBids };

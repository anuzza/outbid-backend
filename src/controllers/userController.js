const User = require("../models/user");
const sendError = require("../utils/error");

//Todo: Refactor the error msg
const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    sendError(res, 400, error);
  }
};

//Todo: Refactor the error msg
const signupUser = async (req, res) => {
  req.body.avatar = "";
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    sendError(res, 500, error);
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      ({ token: tok }) => tok !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    sendError(res, 500, error);
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    res.send({ user: req.user, token: req.token });
  } catch (error) {
    sendError(res, 500, error);
  }
};

const getMyBids = async (req, res) => {
  try {
    await req.user.populate("bids");
    res.send(req.user.bids);
  } catch (error) {
    sendError(res, 500, error);
  }
};

const getMyItems = async (req, res) => {
  try {
    await req.user.populate("items");
    res.send(req.user.items);
  } catch (error) {
    sendError(res, 500, error);
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getLoggedInUser,
  getMyBids,
  getMyItems,
};

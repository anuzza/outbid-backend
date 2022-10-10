const jwt = require("jsonwebtoken");
const User = require("../models/user");

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
    res.status(400).send({ error: error.message });
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
    res.status(400).send({ error: error.message });
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
    res.status(500).send({ error: error.message });
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    res.send({ user: req.user, token: req.token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getLoggedInUser,
};

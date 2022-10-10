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
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new Error("No token found");
    }
    const token = authHeader.replace("Bearer ", "");
    if (token === "") {
      throw new Error("No tokens found");
    }
    const id = await jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Not authenticated!");
    }
    if (!user.tokens.find(({ token: tok }) => tok === token)) {
      throw new Error("Invalid token!");
    }
    user.tokens = user.tokens.filter(({ token: tok }) => tok !== token);
    await user.save();
    res.send();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
};

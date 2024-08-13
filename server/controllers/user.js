require("express-async-errors");
const User = require("../models/user");
const { generateJsonwebToken } = require("../utils/generateJsonwebToken");

const checkUser = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.json({ error: "User not found!" });
  }

  generateJsonwebToken(user._id, res);
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const data = req.body;

  const isExistingUser = await User.findOne({ username: data.username });

  if (isExistingUser) {
    return res.status(403).json({ error: "Username already taken." });
  }

  const newUser = await User.create(data);

  generateJsonwebToken(newUser._id, res);
  res.status(201).json(newUser);
};

module.exports = { checkUser, createUser };

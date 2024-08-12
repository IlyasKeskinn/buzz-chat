require("express-async-errors");
const User = require("../models/user");

const checkUser = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.json({ error: "User not found!" });
  }

  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const data = req.body;

  const newUser = await User.create(data);

  res.status(201).json(newUser);
};

module.exports = { checkUser, createUser };

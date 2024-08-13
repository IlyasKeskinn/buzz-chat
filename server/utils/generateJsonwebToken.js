const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const generateJsonwebToken = (userId, res) => {
  const token = jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: "2d" });
  

  res.cookie("user", token, {
    httpOnly: true,
    maxAge: 10 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });
};

module.exports = { generateJsonwebToken };

const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async function (req, res, next) {
  try {
    const token = req.cookie.user;

    if (!token || token === "undefined") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const tokenDecoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(tokenDecoded);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      console.log("Error in isAuth middleware :" + error);
    }
  }
};

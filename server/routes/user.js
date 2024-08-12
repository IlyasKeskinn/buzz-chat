const express = require("express");
const router = express.Router();

const {checkUser, createUser} = require("../controllers/user");

router.post("/checkuser", checkUser);
router.post("/createuser", createUser);

module.exports = router;

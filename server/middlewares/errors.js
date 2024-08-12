const express = require("express");
const logger = require("../utils/logger");

module.exports = function (error, req, res, next) {
  if (error instanceof Error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

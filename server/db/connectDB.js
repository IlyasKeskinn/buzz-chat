const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const MONGO_URI = process.env.MONGO_URI;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, clientOptions);
    console.log("Succesfuly connected mongodb.");
  } catch (error) {
    console.log("Could not connect to mongodb : " + error);
  } 
};

module.exports = connectMongoDB;

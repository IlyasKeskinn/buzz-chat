const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectMongoDB = require("./db/connectDB");
dotenv.config();

const userRoutes = require("./routes/user.js");

const port = process.env.PORT;

connectMongoDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Servet listen on ${port} port.`);
});

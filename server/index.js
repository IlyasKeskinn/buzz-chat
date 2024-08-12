const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
console.log(port);

//middlewares
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Servet listen on ${port} port.`);
});

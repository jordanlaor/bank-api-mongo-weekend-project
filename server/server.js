const express = require("express");
const cors = require("cors");
const AccountModel = require("./models/accountModel");
const { Mongoose } = require("mongoose");
const router = require("./routes/router");

require("dotenv").config();

const app = express();
require("./db/mongoose");
app.use(express.json());
app.use(cors());
// TODO add routes
app.use(router);
app.use((req, res) => {
  res.status(404).send({ message: "no such request" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("listening to port ", PORT));

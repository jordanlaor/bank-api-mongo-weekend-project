const express = require("express");
const cors = require("cors");
const AccountModel = require("./models/accountModel");

require("dotenv").config();

const app = express();
require("./db/mongoose");
app.use(express.json());
app.use(cors());
// TODO add routes
// app.use();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("listening to port ", PORT));

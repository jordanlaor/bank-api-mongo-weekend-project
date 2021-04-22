const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
require("./db/mongoose");
app.use(express.json());
app.use(cors());
// TODO add routes
// app.use();

console.log(process.env);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("listening to port ", PORT));

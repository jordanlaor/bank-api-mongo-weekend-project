const express = require("express");
const cors = require("cors");
const router = require("./routes/router");

require("dotenv").config();

const app = express();
require("./db/mongoose");
app.use(express.json());
app.use(cors());

const pubDir = path.join(__dirname, "../client/build");
app.use(express.static(pubDir));

// TODO add routes
app.use(router);
app.use((req, res) => {
  res.status(404).send({ error: "no such request" });
});
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("listening to port ", PORT));

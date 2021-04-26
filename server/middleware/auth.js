const jwt = require("jsonwebtoken");
const AdminModel = require("../models/adminModel");

require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const admin = await AdminModel.findOne({ _id: decoded._id, "tokens.token": token });

    if (!admin) throw new Error();

    req.token = token;
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).send({ message: "Please authenticate" });
  }
};

module.exports = auth;

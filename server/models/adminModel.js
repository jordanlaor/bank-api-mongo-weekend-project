const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

AdminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) admin.password = await bcrypt.hash(admin.password, 9);
  next();
});

AdminSchema.statics.findByCredentials = async (username, password) => {
  console.log("find by credentials");
  const admin = await AdminModel.findOne({ username });
  if (!admin) throw new Error("username fail");
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error("password fail");
  return admin;
};

AdminSchema.methods.generateAuthToken = async function () {
  console.log("generate token");
  const admin = this;
  const token = jwt.sign({ _id: admin._id.toString() }, process.env.TOKEN_SECRET, { expiresIn: "7 days" });
  // const token = jwt.sign({ _id: admin._id.toString() }, "something");
  admin.tokens = admin.tokens.concat({ token });
  await admin.save();
  return token;
};

AdminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();

  delete adminObject.password;
  delete adminObject.tokens;

  return adminObject;
};

const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = AdminModel;

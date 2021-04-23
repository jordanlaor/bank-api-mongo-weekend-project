const mongoose = require("mongoose");
const isIsraeliIdValid = require("israeli-id-validator");
const AccountModel = require("./accountModel");

// TODO fix the schema
const ActionModel = mongoose.model("action", {
  date: {
    type: Date,
    default: new Date(),
  },
  actionType: {
    type: String,
    required: true,
    lowercase: true,
    validate(value) {
      if (!["withdraw", "deposit"].includes(value)) throw "not a valid action";
    },
  },
  account: {
    type: String,
    ref: "accounts",
    required: true,
    async validate(value) {
      if (!(await AccountModel.findById(value))) throw "user was not found";
    },
  },
  amount: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 0) throw "action amount needs to be a positive number";
    },
  },
});

module.exports = ActionModel;

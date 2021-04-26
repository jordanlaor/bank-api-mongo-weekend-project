const mongoose = require("mongoose");
const isIsraeliIdValid = require("israeli-id-validator");
const AccountModel = require("./accountModel");

const TransactionsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  actionType: {
    type: String,
    required: true,
    lowercase: true,
    validate(value) {
      if (!["transaction"].includes(value)) throw "not a valid action";
    },
  },
  fromAccount: {
    type: String,
    ref: "accounts",
    required: true,
    async validate(value) {
      if (!(await AccountModel.findById(value))) throw "user was not found";
    },
  },
  toAccount: {
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
const TransactionModel = mongoose.model("transaction", TransactionsSchema);

module.exports = TransactionModel;

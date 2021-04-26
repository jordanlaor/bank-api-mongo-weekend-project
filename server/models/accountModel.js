const mongoose = require("mongoose");
const isIsraeliIdValid = require("israeli-id-validator");

const AccountSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    trim: true,
    async validate(value) {
      if (!isIsraeliIdValid(value)) throw "Passport id is not a valid Israeli ID number";
    },
  },
  credit: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw "Credit needs to be a positive number";
    },
  },
  cash: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < -this.credit) throw "Cash can't be less than the credit allows";
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const AccountModel = mongoose.model("account", AccountSchema);

module.exports = AccountModel;

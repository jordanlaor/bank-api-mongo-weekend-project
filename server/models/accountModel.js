const mongoose = require("mongoose");
const isIsraeliIdValid = require("israeli-id-validator");

// TODO fix the schema
const AccountModel = mongoose.model("account", {
  passportId: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!isIsraeliIdValid(value)) throw "id is not a valid Israeli ID number";
    },
  },
});

module.exports = AccountModel;

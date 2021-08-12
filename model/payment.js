const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  reference: {
    type: String
  },
  trans: {
    type: String
  },
  status: {
    type: String
  },
  message: {
    type: String
  },
  transaction: {
    type: String
  },
  trxref: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  confirmationStatus: {
    type: Boolean,
    default: false
  }
});

module.exports = Payment = mongoose.model("payment", PaymentSchema);

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, default: false, required: true },
  name: { type: String, minlength: 3, required: true },
  phone: { type: String, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

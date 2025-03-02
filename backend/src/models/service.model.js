const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  category: String,
  status: String, // "completed" or "pending"
  price: Number,  // Price of service
});

module.exports = mongoose.model("Service", serviceSchema);

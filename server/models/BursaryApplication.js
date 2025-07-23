const mongoose = require("mongoose");

const bursarySchema = new mongoose.Schema({
  fullName: String,
  email: String,
  school: String,
  familyIncome: Number,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
});

module.exports = mongoose.model("BursaryApplication", bursarySchema);

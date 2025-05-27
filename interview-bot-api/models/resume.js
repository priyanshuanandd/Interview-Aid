const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  filename: String,
  text: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", ResumeSchema);

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  assigned_to: String,
  assigned_by: String,
  deadline: String,
  priority: String,
  source: String,
  confidence: String,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
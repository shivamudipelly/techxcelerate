const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ["Completed", "Pending"], default: "Pending" }
}, { timestamps: true });

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;

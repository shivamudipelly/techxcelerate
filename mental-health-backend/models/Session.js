const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }
}, { timestamps: true });

const UpcomingSession = mongoose.model("Session", sessionSchema);
module.exports = UpcomingSession;

const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  healthStatus: {
    currentMood: { type: String, required: true },
    anxiety: { type: String, required: true },
    lastCheckIn: { type: String, required: true },
    stressLevel: { type: String, required: true }
  }
}, { timestamps: true });

const Dashboard = mongoose.model("Dashboard", dashboardSchema);
module.exports = Dashboard;

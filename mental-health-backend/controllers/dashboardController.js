const Dashboard = require("../models/Dashboard");

const createDashboard = async (req, res) => {
  try {
    const { name, email, currentMood, anxiety, lastCheckIn, stressLevel } = req.body;

    const existingDashboard = await Dashboard.findOne({ userId: req.user.id });
    if (existingDashboard) {
      return res.status(400).json({ message: "Dashboard already exists for this user" });
    }

    const newDashboard = new Dashboard({
      userId: req.user.id,
      userInfo: {
        name,
        email
      },
      healthStatus: {
        currentMood,
        anxiety,
        lastCheckIn,
        stressLevel
      }
    });

    await newDashboard.save();
    res.status(201).json({ message: "Dashboard created successfully", dashboard: newDashboard });
  } catch (error) {
    res.status(500).json({ message: "Error creating dashboard", error: error.message });
  }
};

// 🔹 Fetch Dashboard Data (GET)
const getDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ userId: req.user.id });
    if (!dashboard) return res.status(404).json({ message: "Dashboard not found" });

    res.status(200).json(dashboard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard", error: error.message });
  }
};

// 🔹 Update User Health Status (PUT)
const updateHealthStatus = async (req, res) => {
  try {
    const { currentMood, anxiety, lastCheckIn, stressLevel } = req.body;
    const dashboard = await Dashboard.findOneAndUpdate(
      { userId: req.user.id },
      { healthStatus: { currentMood, anxiety, lastCheckIn, stressLevel } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Health status updated", dashboard });
  } catch (error) {
    res.status(500).json({ message: "Error updating health status", error: error.message });
  }
};

module.exports = { createDashboard, getDashboard, updateHealthStatus };

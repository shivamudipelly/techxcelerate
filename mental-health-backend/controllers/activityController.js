
const Activity = require("../models/Activity");


// 🔹 Add a new activity
const addActivity = async (req, res) => {
    try {
      const { title, date, time, status } = req.body;
  
      if (!title || !date || !time || !status) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newActivity = new Activity({
        userId: req.user.id,
        title,
        date,
        time,
        status,
      });
  
      await newActivity.save();
      res.status(201).json({ message: "Activity added successfully", activity: newActivity });
    } catch (error) {
      res.status(500).json({ message: "Error adding activity", error: error.message });
    }
  };

// 🔹 Get all activities
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities", error: error.message });
  }
};

module.exports = { addActivity, getActivities };

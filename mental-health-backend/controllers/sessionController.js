const Session = require("../models/Session");

// Fetch All Upcoming Sessions for User
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sessions", error: error.message });
  }
};

// Add New Session
const addSession = async (req, res) => {
  try {
    const { title, date, time } = req.body;
    const newSession = new Session({
      userId: req.user.id,
      title,
      date,
      time
    });

    await newSession.save();
    res.status(201).json({ message: "Session added", session: newSession });
  } catch (error) {
    res.status(500).json({ message: "Error adding session", error: error.message });
  }
};

module.exports = {getSessions, addSession};

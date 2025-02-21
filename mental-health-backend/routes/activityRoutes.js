const express = require("express");
const { addActivity, getActivities } = require("../controllers/activityController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addActivity);
router.get("/", protect, getActivities);

module.exports = router;

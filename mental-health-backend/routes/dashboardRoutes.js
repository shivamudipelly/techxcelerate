const express = require("express");
const {createDashboard, getDashboard, updateHealthStatus  } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getDashboard);
router.put("/", protect, updateHealthStatus);
router.post("/", protect, createDashboard);

module.exports = router;

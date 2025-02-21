const express = require("express");
const { getSessions, addSession } = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getSessions);
router.post("/", protect, addSession);

module.exports = router;

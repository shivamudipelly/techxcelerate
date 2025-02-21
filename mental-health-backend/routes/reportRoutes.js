const express = require("express");
const { uploadReport, getReports } = require("../controllers/reportController");
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadReport);
router.get("/", protect, getReports);

module.exports = router;

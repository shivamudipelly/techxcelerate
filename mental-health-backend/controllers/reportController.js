const MedicalReport = require("../models/MedicalReport");
const path = require("path");

// Upload medical report
const uploadReport = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const fileUrl = `/uploads/${req.file.filename}`; 
        const report = await MedicalReport.create({
            user: req.user.id,
            filename: req.file.filename,
            fileUrl: fileUrl,
        });

        res.status(201).json({ message: "File uploaded successfully", report });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Fetch user reports
const getReports = async (req, res) => {
    try {
        const reports = await MedicalReport.find({ user: req.user.id });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { uploadReport, getReports };

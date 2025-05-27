const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Resume = require("../models/resume");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const data = await pdfParse(fileBuffer);
    const extractedText = data.text.trim();

    // ✅ Send response immediately
    res.json({ success: true, resumeText: extractedText });

    // ✅ Save to DB in background (non-blocking)
    Resume.create({
      filename: req.file.originalname,
      text: extractedText,
    }).catch((err) => {
      console.error("Error saving resume to DB (non-blocking):", err);
    });

  } catch (error) {
    console.error("Resume upload error:", error);
    return res.status(500).json({ success: false, message: "Failed to parse resume" });
  }
});

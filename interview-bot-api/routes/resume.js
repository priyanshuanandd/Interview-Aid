const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Setup multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const data = await pdfParse(fileBuffer);

    const extractedText = data.text.trim();
    return res.json({ success: true, resumeText: extractedText });
  } catch (error) {
    console.error("Resume upload error:", error);
    return res.status(500).json({ success: false, message: "Failed to parse resume" });
  }
});

module.exports = router;
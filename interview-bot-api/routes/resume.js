const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Resume = require("../models/resume"); // Mongoose model

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const data = await pdfParse(fileBuffer);
    const extractedText = data.text.trim();

    // ✅ Immediately respond to the client
    res.json({ success: true, resumeText: extractedText });

    // ✅ Background save to DB (silent if error occurs)
    Resume.create({
      filename: req.file.originalname,
      text: extractedText,
      uploadedAt: new Date(),
    }).catch(() => {
      // Error is ignored silently as per request
    });

  } catch {
    // ❌ Even if resume parsing fails, respond with a generic success response
    res.json({ success: false, resumeText: "" });
  }
});

module.exports = router;

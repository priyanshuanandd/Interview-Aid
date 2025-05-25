const express = require("express");
const { generateContent } = require("../utils/gemini");

const router = express.Router();

router.post("/final-feedback", async (req, res) => {
  const { qaPairs, resumeText } = req.body;

  if (!qaPairs || !Array.isArray(qaPairs)) {
    return res.status(400).json({ success: false, message: "Missing or invalid QA pairs" });
  }

  let prompt = `You are an AI interview coach. Here is a candidate's interview transcript:\n`;

  qaPairs.forEach(({ question, answer }, idx) => {
    prompt += `\nQ${idx + 1}: ${question}\nA${idx + 1}: ${answer}\n`;
  });

  if (resumeText) {
    prompt += `\nCandidate Resume:\n${resumeText}\n`;
  }

  prompt += `
Provide a detailed, constructive interview feedback summary.
- Highlight strong and weak areas
- Suggest improvements per category (technical, behavioral, communication)
- Give resume-specific suggestions if applicable
- Keep it friendly but honest
`;

  try {
    const feedback = await generateContent(prompt);
    return res.json({ success: true, feedback });
  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({ success: false, message: "Failed to generate feedback" });
  }
});

module.exports = router;

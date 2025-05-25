const express = require("express");
const { generateContent } = require("../utils/gemini");

const router = express.Router();

router.post("/get-questions", async (req, res) => {
  const { resumeText, role, difficulty } = req.body;

  if (!resumeText || !role || !difficulty) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const prompt = `
You are an AI interviewer for a ${role} Software Engineer fresher role.

Here is the candidate’s resume:
${resumeText}

Ask 10 ${difficulty}-level interview questions (mix of technical and behavioral).
Return each question as a numbered list.
`;

  try {
    const output = await generateContent(prompt);
    const questions = output
      .split("\n")
      .filter((line) => line.trim())
      .map((q) => q.replace(/^\d+\.\s*/, "").trim());

    return res.json({ success: true, questions });
  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({ success: false, message: "Failed to generate questions" });
  }
});

module.exports = router;

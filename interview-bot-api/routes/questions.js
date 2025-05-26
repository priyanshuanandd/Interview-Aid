const express = require("express");
const { generateContent } = require("../utils/gemini");

const router = express.Router();

router.post("/get-questions", async (req, res) => {
  const { resumeText, role, difficulty,duration } = req.body;

  if (!resumeText || !role || !difficulty) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const prompt = `
You are an AI interviewer for a ${role} Software Engineer fresher role.

Here is the candidate’s resume:
${resumeText}

Ask any number of ${difficulty}-level interview questions (mix of technical and behavioral) so that the interview is of around ${duration} minutes.
Return each question as a numbered list.
Number the questions clearly in a list.Just output the questions and the first question for introducing himself and also introduce yourself before that.
Only Output Questions and answers.
Don't output the reason for question or which type of question it is.
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

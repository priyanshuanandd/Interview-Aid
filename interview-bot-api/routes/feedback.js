const express = require("express");
const { generateContent } = require("../utils/gemini");

const router = express.Router();

router.post("/final-feedback", async (req, res) => {
  const { questionsAndAnswers, resumeText } = req.body;

  if (!questionsAndAnswers || !Array.isArray(questionsAndAnswers)) {
    return res.status(400).json({ success: false, message: "Missing or invalid QA pairs" });
  }

  for (const qa of questionsAndAnswers) {
    if (typeof qa.question !== "string" || typeof qa.answer !== "string") {
      return res.status(400).json({ success: false, message: "Invalid question or answer format" });
    }
  }

  let prompt = `You are an AI interview coach. Based on the transcript below and the candidate’s resume, provide:

1. Detailed interview feedback formatted in markdown (## sections, **bold** etc.)
2. Ratings out of 10 for these 3 categories (in JSON format only):
   - technical
   - behavioral
   - communication

IMPORTANT: First return only the JSON object with the scores. Then add a separator like "---FEEDBACK---" and then write the markdown-formatted feedback text.

Transcript:\n`;

  questionsAndAnswers.forEach(({ question, answer }, idx) => {
    prompt += `\nQ${idx + 1}: ${question}\nA${idx + 1}: ${answer}\n`;
  });

  if (resumeText) {
    prompt += `\n\nResume:\n${resumeText}\n`;
  }

  prompt += `
Generate the output as:
{
  "technical": 6,
  "behavioral": 4,
  "communication": 3
}
---FEEDBACK---
## Title...
**Sections**
...

Only respond in this exact format.
`;

  try {
    const raw = await generateContent(prompt);

    const parts = raw.split("---FEEDBACK---");

    if (parts.length !== 2) {
      throw new Error("Malformed response from Gemini: Missing feedback separator");
    }

    const rawJson = parts[0].trim();
    const feedbackMarkdown = parts[1].trim();

    // Extract valid JSON using regex (handles if it's in a code block)
    const jsonMatch = rawJson.match(/\{[^}]+\}/s);

    if (!jsonMatch) {
      throw new Error("Failed to extract JSON ratings from Gemini response");
    }

    let ratings;

    try {
      ratings = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("JSON parse error:", e);
      throw new Error("Gemini returned invalid JSON");
    }


    return res.json({
      success: true,
      feedback: {
        ratings,
        feedbackText: feedbackMarkdown,
      },
    });

  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({ success: false, message: "Failed to generate feedback" });
  }
});

module.exports = router;

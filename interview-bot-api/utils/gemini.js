const genAI = require("@google/generative-ai");
require("dotenv").config();

const genAIClient = new genAI.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAIClient.getGenerativeModel({ model: "models/gemini-1.5-flash" });

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = { generateContent };

# 🎤 Interview Aid – AI-Powered Mock Interview Platform

**Interview Aid** is a full-stack AI-powered mock interview platform designed to help job seekers practice and receive intelligent feedback based on their resume, role preference, difficulty level, and interview duration. The tool combines resume parsing, dynamic question generation using Google's Gemini AI, and rich frontend interactions to simulate real interview scenarios.

> 🔗 [Live Demo (if deployed)](https://your-frontend-production-url.com)  
> ✨ Built with React, Node.js, Express, and Gemini 1.5 Flash

---

## 📸 Features

- ✅ Resume PDF Upload and Parsing
- 🧠 Contextual, AI-Generated Interview Questions
- 🎛️ Configurable Role, Difficulty & Duration
- 🎤 Chat-based Interview Interaction
- 📈 Auto Feedback & Rating (Technical, Communication, Behavioral)
- 📊 Visualized Feedback Panel
- 🎙️ Voice input/output (planned or supported)

---

## 🗂️ Project Structure

```bash
interview-aid/
│
├── frontend/            # React + Vite frontend
│   ├── components/      # UI Components (Upload, Controls, Chat, Feedback)
│   ├── hooks/           # Custom hooks (e.g., useInterview)
│   ├── App.jsx          # Main frontend logic
│   └── index.html       # Entry point
│
├── backend/             # Node.js + Express backend
│   ├── routes/          # Route files for resume, questions, feedback
│   ├── server.js        # Express server setup (index.js)
│   └── .env             # Contains GEMINI_API_KEY
│
├── main.py              # Command-line interface version using Gemini API
├── sample_resume.pdf    # Test resume
└── README.md            # You're here!

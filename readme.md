# 🎤 Interview Aid – AI-Powered Mock Interview Platform

**Interview Aid** is a full-stack AI-powered mock interview platform designed to help job seekers practice and receive intelligent feedback based on their resume, role preference, difficulty level, and interview duration. The tool combines resume parsing, dynamic question generation using Google's Gemini AI, and rich frontend interactions to simulate real interview scenarios.

> 🔗 [Live Demo](https://interviewaid.vercel.app)  
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
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/interview-aid.git
cd interview-aid
```

### 2. Setup Backend

```bash
cd backend
npm install
```

> Create a `.env` file:
```
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the server:

```bash
npm run dev
```

Runs at `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

> Ensure the `VITE_BACKEND_URL` in `.env` points to your local or deployed backend:
```env
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🧪 Running the Python CLI (Optional)

You can also run the CLI-based version:

```bash
pip install -r requirements.txt
python main.py
```

---

## ⚙️ Environment Variables

### Backend `.env`

```env
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend `.env`

```env
VITE_BACKEND_URL=http://localhost:5000
```

---

## 📦 Dependencies

### Frontend

- React 19
- Vite
- TailwindCSS
- Recharts
- Lucide-react
- axios, react-markdown, classnames

### Backend

- Express 5
- @google/generative-ai
- multer for file uploads
- pdf-parse for resume text extraction
- dotenv, cors, nodemon

### Python (CLI)

- python-dotenv
- PyMuPDF (fitz)
- google-generativeai

---

## 📋 Sample Workflow

1. Upload your resume (PDF)
2. Configure your interview (role, difficulty, time)
3. Gemini generates tailored questions
4. You answer in a chatbot UI
5. Gemini gives detailed feedback + scores

---

## 📊 Feedback Categories

- Technical Knowledge
- Communication Skills
- Behavioral Insights
- Overall Score (out of 10)
- Improvement Suggestions

---

## 🧑‍💻 Author

Made with ❤️ by [Priyanshu Anand](https://priyanshuanand.vercel.app)

---

## 📜 License

This project is licensed under the MIT License.

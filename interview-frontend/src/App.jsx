import { useState, useEffect } from "react";
import axios from "axios";
import UploadResume from "./components/UploadResume";
import ControlsPanel from "./components/ControlsPanel";
import ChatInput from "./components/ChatInput";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import ReactMarkdown from "react-markdown";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [uploading, setUploading] = useState(false);

  const [role, setRole] = useState("Backend Developer");
  const [difficulty, setDifficulty] = useState("easy");
  const [duration, setDuration] = useState(30);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [userAnswers, setUserAnswers] = useState([]);
  const [interviewComplete, setInterviewComplete] = useState(false);

  const [finalFeedback, setFinalFeedback] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [finalFeedbackText, setFinalFeedbackText] = useState("");
  const [ratings, setRatings] = useState([]);

  // Upload resume handler
  const handleResumeUpload = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:5000/api/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        setResumeText(res.data.resumeText);
        console.log("Resume uploaded and parsed successfully.");
      } else {
        alert("Failed to parse resume.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading resume.");
    } finally {
      setUploading(false);
    }
  };

  // Start interview - fetch questions
  const startInterview = async () => {
    if (!resumeText) return alert("Please upload a resume first.");
    try {
      setLoadingQuestions(true);
      const res = await axios.post("http://localhost:5000/api/get-questions", {
        resumeText,
        role,
        difficulty,
        duration,
      });

      if (res.data.success) {
        setQuestions(res.data.questions);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setInterviewComplete(false);
        setFinalFeedback(null);
      } else {
        alert("Failed to generate questions.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error generating questions.");
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Handle user's answer to current question
  const handleUserResponse = (answer) => {
    if (currentQuestionIndex >= questions.length) return;

    setUserAnswers((prev) => [
      ...prev,
      { question: questions[currentQuestionIndex], answer },
    ]);

    if (currentQuestionIndex + 1 === questions.length) {
      setInterviewComplete(true);
    }

    setCurrentQuestionIndex((prev) => prev + 1);
  };

  // Fetch final feedback once interview is complete
  useEffect(() => {
    const getFinalFeedback = async () => {
      if (!interviewComplete) return;
      setLoadingFeedback(true);

      try {
        const res = await axios.post("http://localhost:5000/api/final-feedback", {
          questionsAndAnswers: userAnswers,
          resumeText,
        });

        if (res.data.success) {
          const { ratings, feedbackText } = res.data.feedback;
          setFinalFeedbackText(feedbackText);
          setRatings([
            { category: "Technical Skills", score: ratings.technical },
            { category: "Behavioral Skills", score: ratings.behavioral },
            { category: "Communication Skills", score: ratings.communication },
          ]);
        } else {
          alert("Failed to get final feedback.");
        }
      } catch (err) {
        console.error("Final feedback fetch error:", err);
        alert("Error fetching final feedback.");
      } finally {
        setLoadingFeedback(false);
      }
    };

    getFinalFeedback();
  }, [interviewComplete, userAnswers, resumeText]);
  
  // SPEECH SYNTHESIS useEffect - reads current question aloud
  useEffect(() => {
    if (
      questions.length > 0 &&
      currentQuestionIndex < questions.length &&
      typeof questions[currentQuestionIndex] === "string" &&
      questions[currentQuestionIndex].trim() !== ""
    ) {
      // Cancel any ongoing speech before starting new one
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
      utterance.lang = "en-US";

      window.speechSynthesis.speak(utterance);

      // Cleanup: cancel speech on component unmount or before next effect run
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, [questions, currentQuestionIndex]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Interview Q&A Bot</h1>

      <UploadResume onUpload={handleResumeUpload} />
      {uploading && <p className="text-sm text-blue-500">Uploading and extracting...</p>}

      {resumeText && (
        <>
          <div className="mt-4 bg-gray-100 p-4 rounded max-h-60 overflow-y-auto text-sm">
            <p className="font-semibold mb-2 ">Extracted Resume Text Succesfully</p>
            {/* <p>{resumeText.slice(0, 1000)}...</p> */}
          </div>

          <ControlsPanel
            role={role}
            setRole={setRole}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            duration={duration}
            setDuration={setDuration}
          />

          <button
            onClick={startInterview}
            className="bg-green-600 text-white px-4 py-2 rounded mt-2"
            disabled={loadingQuestions}
          >
            {loadingQuestions ? "Generating questions..." : "Start Interview"}
          </button>

          {/* Show question and input */}
          {questions.length > 0 && currentQuestionIndex < questions.length && (
            <div className="mt-6">
              <div className="bg-gray-100 p-4 rounded shadow mb-4">
                <p className="font-medium text-gray-800">
                  {questions[currentQuestionIndex]}
                </p>
              </div>

              <ChatInput onSend={handleUserResponse} />
            </div>
          )}

          {/* Show completion and final feedback */}
          {interviewComplete && (
            <div className="mt-6">
              <div className="text-center text-green-600 font-semibold mb-4">
                🎉 Interview Complete! Thank you for your responses.
              </div>
              {loadingFeedback && (
                <p className="text-blue-500">Fetching final feedback...</p>
              )}
              {finalFeedbackText && (
                <div className="bg-gray-100 p-6 rounded shadow text-left space-y-6">
                  <h2 className="text-xl font-bold mb-2">Final Feedback Summary</h2>

                  {/* Graph Ratings */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Ratings (out of 10):</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={ratings} layout="vertical" margin={{ left: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 10]} />
                        <YAxis dataKey="category" type="category" />
                        <Tooltip />
                        <Bar dataKey="score" fill="#4ade80" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Markdown Feedback */}
                  <div className="prose max-w-none">
                    <ReactMarkdown>{finalFeedbackText}</ReactMarkdown>
                  </div>
                </div>
              )}

            </div>
          )}
        </>
      )}
      <footer className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
          Made with ❤️ by{" "}
          <a
            href="https://priyanshuanand.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Priyanshu Anand
          </a>
        </footer>
    </div>
  );
}

export default App;

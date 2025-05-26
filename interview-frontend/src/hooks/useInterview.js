import { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export default function useInterview() {
  const [resumeText, setResumeText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [role, setRole] = useState("Backend Developer");
  const [difficulty, setDifficulty] = useState("easy");
  const [duration, setDuration] = useState(30);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [interviewComplete, setInterviewComplete] = useState(false);

  const [finalFeedbackText, setFinalFeedbackText] = useState("");
  const [ratings, setRatings] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const uploadingResume = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    try {
      setUploading(true);
      const res = await axios.post(`${backendUrl}/api/upload-resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        setResumeText(res.data.resumeText);
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

  const startInterview = async () => {
    if (!resumeText) return alert("Please upload a resume first.");
    try {
      setLoadingQuestions(true);
      const res = await axios.post(`${{backendUrl}}/api/get-questions`, {
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
        setFinalFeedbackText("");
        setRatings([]);
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

  const handleUserResponse = (answer) => {
    if (currentQuestionIndex >= questions.length) return;

    const updatedAnswers = [
      ...userAnswers,
      { question: questions[currentQuestionIndex], answer },
    ];
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex + 1 === questions.length) {
      setInterviewComplete(true);
    }

    setCurrentQuestionIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!interviewComplete) return;
      try {
        setLoadingFeedback(true);
        const res = await axios.post(`${{backendUrl}}/api/final-feedback`, {
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
        console.error("Feedback error:", err);
        alert("Error fetching final feedback.");
      } finally {
        setLoadingFeedback(false);
      }
    };

    fetchFeedback();
  }, [interviewComplete]);

  return {
    resumeText,
    uploading,
    uploadingResume,
    role,
    setRole,
    difficulty,
    setDifficulty,
    duration,
    setDuration,
    questions,
    currentQuestionIndex,
    handleUserResponse,
    startInterview,
    interviewComplete,
    finalFeedbackText,
    ratings,
    loadingQuestions,
    loadingFeedback,
  };
}

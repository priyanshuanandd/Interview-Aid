import { useState, useEffect } from "react";
import UploadResume from "./components/UploadResume";
import ControlsPanel from "./components/ControlsPanel";
import ChatInput from "./components/ChatInput";
import QuestionDisplay from "./components/QuestionDisplay";
import FeedbackPanel from "./components/FeedbackPanel";

import useInterview from "./hooks/useInterview";

function App() {
  const {
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
  } = useInterview();

  // pageIndex: 0 = Setup, 1 = Interview, 2 = Feedback
  const [pageIndex, setPageIndex] = useState(0);

  // Wrapper for startInterview to move to interview section after questions load
  async function handleStartInterview() {
    await startInterview();
    setPageIndex(1);
  }

  // Move to feedback page when interview completes
  // Could be triggered inside useEffect or on interviewComplete change
  // For demo, add a useEffect:
  useEffect(() => {
    if (interviewComplete) {
      setPageIndex(2);
    }
  }, [interviewComplete]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 overflow-hidden h-screen relative">
      {/* Sliding container including header, all pages, and footer */}
      <div
        className="transition-transform duration-700 ease-in-out"
        style={{
          height: "400vh",  // 4 full pages: header+setup, interview, feedback, footer
          width: "100%",
          transform: `translateY(-${pageIndex * 100}vh)`,
        }}
      >
        {/* --- PAGE 0: Header + Setup Section --- */}
        <section className="h-screen w-full flex flex-col gap-4 px-4 py-6 justify-center">
          <h1 className="text-5xl font-extrabold tracking-wide mb-6 text-green-600 drop-shadow-md text-center">
            Interview Q&A Bot
          </h1>

          <UploadResume onUpload={uploadingResume} />

          {uploading && (
            <p className="text-sm text-blue-500 animate-pulse text-center">
              Uploading and extracting...
            </p>
          )}

          {resumeText && (
            <>
              <div className="mt-4 p-4 rounded border border-green-300 bg-green-50 text-green-800 text-sm flex items-start gap-2">
                <svg
                  className="w-5 h-5 mt-0.5 text-green-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <div>
                  <p className="font-semibold">Resume extracted successfully!</p>
                  <p className="text-xs text-green-700 mt-1">
                    You're all set to configure your interview session.
                  </p>
                </div>
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
                onClick={handleStartInterview}
                disabled={loadingQuestions}
                className={`mt-2 px-6 py-3 rounded-lg font-semibold transition duration-300 self-center ${loadingQuestions
                    ? "bg-green-300 text-green-800 cursor-not-allowed"
                    : "bg-green-500 text-white shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400"
                  }`}
              >
                {loadingQuestions ? "Generating questions..." : "Start Interview"}
              </button>
            </>
          )}
          <footer className="text-center text-sm text-gray-600">
            Made with ❤️ by{" "}
            <a
              href="https://priyanshuanand.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Priyanshu Anand
            </a>
          </footer>
        </section>

        {/* --- PAGE 1: Interview Section --- */}
        <section className="h-screen w-full flex flex-col justify-center px-4 py-6 gap-4">
          {questions.length > 0 && currentQuestionIndex < questions.length ? (
            <>
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Interview in Progress<span className="animate-dots"></span>
                  <style jsx>{`
        .animate-dots::after {
          content: '';
          animation: dots 4s steps(4, end) infinite;
        }

        @keyframes dots {
          0% { content: ''; }
          25% { content: '.'; }
          50% { content: '..'; }
          75% { content: '...'; }
          100% { content: ''; }
        }
      `}</style>
                </h2>
                {/* <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p> */}
              </div>
              <QuestionDisplay question={questions[currentQuestionIndex]} />
              <ChatInput onSend={handleUserResponse} />
            </>
          ) : (
            <p className="text-gray-600 text-center text-xl">
              Waiting for questions to load...
            </p>
          )}
          <footer className="text-center text-sm text-gray-600">
            Made with ❤️ by{" "}
            <a
              href="https://priyanshuanand.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Priyanshu Anand
            </a>
          </footer>
        </section>

        {/* --- PAGE 2: Feedback Section --- */}
        <section className="h-screen w-full flex flex-col justify-center px-4 py-6 gap-6 overflow-auto">
          <div className="bg-green-50 rounded-lg shadow-lg p-6 max-h-full overflow-auto">
            {loadingFeedback ? (
              <p className="text-blue-500 text-center text-xl">
                Fetching final feedback...
              </p>
            ) : (
              <>
                <FeedbackPanel ratings={ratings} feedbackText={finalFeedbackText} />

                <button
                  onClick={() => setPageIndex(0)}
                  className="mt-6 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Restart Interview
                </button>
              </>
            )}
          </div>
          <footer className="text-center text-sm text-gray-600">
            Made with ❤️ by{" "}
            <a
              href="https://priyanshuanand.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Priyanshu Anand
            </a>
          </footer>
        </section>

        {/* --- PAGE 3: Footer Section --- */}
        <section className="h-screen w-full flex items-center justify-center px-4">
          <footer className="text-center text-sm text-gray-600">
            Made with ❤️ by{" "}
            <a
              href="https://priyanshuanand.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Priyanshu Anand
            </a>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default App;

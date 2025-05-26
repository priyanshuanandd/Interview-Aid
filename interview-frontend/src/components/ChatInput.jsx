import { useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const { listening, startListening, stopListening, resetTranscript} = useSpeechRecognition((text) => {
    setInput(text);
  });

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
      stopListening();
      resetTranscript();
    }
  };

  const toggleListening = () => {
    if (listening) stopListening();
    else startListening();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { // Use Shift+Enter for new lines
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-start gap-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 border border-gray-300 p-2 rounded resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type or speak your answer..."
      />
      <div className="flex flex-col gap-2">
        <button
          onClick={toggleListening}
          className={`px-3 py-2 rounded ${listening ? "bg-red-500" : "bg-blue-500"} text-white`}
          title="Speak your answer"
        >
          🎤
        </button>
        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
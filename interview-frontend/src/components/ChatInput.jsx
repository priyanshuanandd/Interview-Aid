import { useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const { listening, startListening, stopListening } = useSpeechRecognition((text) => {
    setInput(text);
  });

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  const toggleListening = () => {
    if (listening) stopListening();
    else startListening();
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 border border-gray-300 p-2 rounded"
        placeholder="Type or speak your answer..."
      />
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
  );
}

export default ChatInput;

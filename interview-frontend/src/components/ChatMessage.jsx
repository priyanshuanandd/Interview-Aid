export default function ChatMessage({ sender, text }) {
  return (
    <div className={`my-2 flex ${sender === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-2xl px-4 py-2 max-w-[75%] ${
          sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

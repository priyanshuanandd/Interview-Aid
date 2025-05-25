import ChatMessage from "./ChatMessage";

export default function ChatWindow({ messages }) {
  return (
    <div className="h-[60vh] overflow-y-auto p-4 bg-white rounded-lg border shadow-sm">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
}

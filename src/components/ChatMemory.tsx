import type { ChatMessage } from "@/types/story";

type ChatMemoryProps = {
  messages: ChatMessage[];
};

export function ChatMemory({ messages }: ChatMemoryProps) {
  return (
    <div className="chat-memory" aria-label="Conversation">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat-row ${message.sender === "Ash" ? "chat-row-ash" : ""}`}
          data-reveal="chat"
        >
          <p className="chat-sender">{message.sender}</p>
          <p className="chat-bubble">{message.text}</p>
        </div>
      ))}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";

export default function ChatPage({ params }) {
  const { id } = params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/chats/${id}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []));
  }, [id]);

  const sendMessage = async () => {
    await fetch(`http://localhost:5000/api/chats/${id}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: "USER_ID", text }),
    });
    setText("");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Chat</h1>
      <div className="border p-4 h-64 overflow-y-scroll mb-4">
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.sender}</strong>: {msg.text}</p>
        ))}
      </div>
      <input className="border p-2 mr-2" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage} className="bg-blue-600 text-white px-3 py-1 rounded">Send</button>
    </div>
  );
}

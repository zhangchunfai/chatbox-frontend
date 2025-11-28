import React, { useState } from "react";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "你", text: input }];
    setMessages(newMessages);

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();

      setMessages([...newMessages, { sender: "AI", text: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "系统", text: "后端连接失败" }]);
    }

    setInput("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", fontFamily: "Arial" }}>
      <h1>Chatbox Demo</h1>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll", marginBottom: "10px" }}>
        {messages.map((msg, i) => (
          <p key={i}><b>{msg.sender}:</b> {msg.text}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入消息..."
        style={{ width: "70%", padding: "5px" }}
      />
      <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "5px 10px" }}>
        发送
      </button>
    </div>
  );
}

export default ChatBox;

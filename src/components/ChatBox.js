import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css"; // 引入同级的样式文件

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "你", text: input }];
    setMessages(newMessages);

    try {
      const res = await fetch(process.env.REACT_APP_GRAPHQL_URL, {
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

  // 回车键发送
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbox-container">
      <h1 className="chatbox-title">Chatbox Demo</h1>
      <div className="chatbox-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${
              msg.sender === "你"
                ? "user"
                : msg.sender === "AI"
                ? "ai"
                : "system"
            }`}
          >
            <span className="sender">{msg.sender}:</span>
            <span className="text">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbox-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入消息..."
        />
        <button onClick={sendMessage}>发送</button>
      </div>
    </div>
  );
}

export default ChatBox;

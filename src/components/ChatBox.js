import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // AI 正在输入状态
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "你", text: input }];
    setMessages(newMessages);
    setIsTyping(true); // 显示 AI 正在输入动画

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

    setIsTyping(false); // 停止动画
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
  <div className="chatbox-page">
    {/* 左边聊天框 */}
    <div className="chatbox-container">
      {/* 标题区：加图片 */}
      <div className="chatbox-header">
  {/* 左边图片：450px */}
  <img src="/images/2.png" alt="logo" className="chatbox-logo" />

  {/* 中间文字 */}
  <div className="chatbox-header-text">
    <h1 className="chatbox-title">Travel Go</h1>
    <p className="chatbox-subtitle">Powered by Azure OpenAI - GPT-5-chat</p>
  </div>

  {/* 右边图片：350px */}
  <img src="/images/3.png" alt="side" className="chatbox-logo-small" />
</div>

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
            } fade-in`}
          >
            <span className="sender">{msg.sender}:</span>
            <span className="text">{msg.text}</span>
          </div>
        ))}

        {/* AI 正在输入动画：圆圈旋转 */}
        {isTyping && (
          <div className="ai-typing">
            <span className="typing-circle"></span>
            <span className="typing-text">AI 正在输入...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 输入框固定底部 */}
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

{/* ✅ 右边竖图要放在 chatbox-container 外面 */}
    <div className="chatbox-side">
      <img src="/images/6.png" alt="side-banner" className="chatbox-side-image" />
    </div>
  </div>
);
}

export default ChatBox;

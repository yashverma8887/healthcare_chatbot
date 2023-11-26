// Chatbox.js

import React, { useState } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  
  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const newUserMessage = { text: inputMessage, sender: 'user' };
      setMessages([...messages, newUserMessage]);
      setInputMessage('');

      try {
       const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
          { role: "system", content: inputMessage },],
      };
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + "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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const botResponse = await response.json();

      setTimeout(() => {
        const newBotMessage = { text: botResponse.choices[0].message.content, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      }, 500);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
};

return (
  <div className="chatbox">
  <div className="messages">
  {messages.map((message, index) => (
    <div key={index} className={`message ${message.sender}`}>
    {message.text}
    </div>
    ))}
    </div>
    <div className="input-container">
    <input
    type="text"
    placeholder="Type your message..."
    value={inputMessage}
    onChange={handleInputChange}
    />
    <button onClick={handleSendMessage}>Send</button>
    </div>
    </div>
    );
  };

  export default Chatbox;

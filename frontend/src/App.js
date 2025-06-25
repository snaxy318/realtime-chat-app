import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import './App.css';
import config from "./config";

const socket = io(config.SOCKET_URL);

function App() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on("message", (data) => {
            setChat((prev) => [...prev, data]);
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() === "" || username.trim() === "") return;

        const data = {
            username,
            message
        };

        socket.emit("message", data);
        setMessage("");
    };

    return (
      <div className="container">
        <h1 className="heading">💬 Realtime Chat App</h1>
    
        <input
          className="input"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
    
        <div className="chat-box">
          {chat.map((msg, idx) => (
            <div key={idx} className="message">
              <span className="user">{msg.username}:</span> {msg.message}
            </div>
          ))}
        </div>
    
        <div className="input-row">
          <input
            className="input"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="send-btn">Send</button>
        </div>
      </div>
    );
    
}

export default App;

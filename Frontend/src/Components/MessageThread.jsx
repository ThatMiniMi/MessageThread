import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMessage from "./AddMessage";
import MessageBubble from "./MessageBubble";

const MessageThread = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/messages");
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Message Thread</h2>
      <div>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>
      <AddMessage />
    </div>
  );
};

export default MessageThread;


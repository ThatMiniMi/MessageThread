import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5215/api/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <div>
      <h2>Messages</h2>
      <div>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;

import { useState, useEffect } from "react";
import axios from "../axios";

const MessageThread = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get("/messages/thread");
      setMessages(res.data);
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    const newMessage = { text: message };
    await axios.post("/messages/thread", newMessage);
    setMessage(""); // clear input after sending
    // Re-fetch messages after posting a new one
    const res = await axios.get("/messages/thread");
    setMessages(res.data);
  };

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Write a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageThread;

import { useState, useEffect } from "react";
import axios from "../axios";

const PrivateMessages = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`/messages/private/${userId}`);
      setMessages(res.data);
    };
    fetchMessages();
  }, [userId]);

  const handleSendMessage = async () => {
    const newMessage = { text: message, receiverId: receiverId, senderId: userId };
    await axios.post("/messages/private", newMessage);
    setMessage(""); // clear input after sending
    // Re-fetch messages after posting a new one
    const res = await axios.get(`/messages/private/${userId}`);
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
        type="number"
        placeholder="Receiver User ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
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

export default PrivateMessages;

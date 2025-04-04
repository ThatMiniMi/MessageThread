import { useEffect, useState } from "react";
import axios from "../axios";
import MessageBubble from "./MessageBubble";

const MessageList = ({ currentUserId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages").then((res) => {
      setMessages(res.data);
    });
  }, []);

  return (
    <div className="p-4 space-y-4">
      {messages.map((msg) => (
        <MessageBubble 
          key={msg.id} 
          message={msg} 
          currentUserId={currentUserId} 
        />
      ))}
    </div>
  );
};

export default MessageList;
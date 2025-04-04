import React, { useState } from "react";
import axios from "axios";

const AddMessage = ({ onMessageAdded }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:5215/api/messages", { content: message });

      onMessageAdded();

      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        rows="4"
        className="border rounded p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2">
        Send Message
      </button>
    </form>
  );
};

export default AddMessage;

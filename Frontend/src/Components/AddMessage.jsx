import React, { useState } from "react";
import axios from "axios";

const AddMessage = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("/api/messages", { content: message });
      console.log("Message added:", res.data);
      setMessage("");
    } catch (err) {
      console.error("Error adding message:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>New Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Message</button>
    </form>
  );
};

export default AddMessage;


import { useState } from "react";
import axios from "../axios";
import { Button, TextField } from "@mui/material";

const AddMessage = ({ onMessageAdded }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await axios.post("/messages", { text: message });
    setMessage("");
    onMessageAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex gap-4">
      <TextField
        fullWidth
        label="Enter your message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" variant="contained">
        Send
      </Button>
    </form>
  );
};

export default AddMessage;

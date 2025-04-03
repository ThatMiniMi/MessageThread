import { useEffect, useState } from "react";
import axios from "../axios";
import { Card, CardContent, Typography } from "@mui/material";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages").then((res) => {
      setMessages(res.data);
    });
  }, []);

  return (
    <div className="p-4 grid gap-4">
      {messages.map((msg) => (
        <Card key={msg.id} className="shadow-md">
          <CardContent>
            <Typography variant="body1">{msg.text}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MessageList;
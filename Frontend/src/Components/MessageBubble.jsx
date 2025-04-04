import React from "react";

const MessageBubble = ({ message }) => {
  return (
    <div className="message-bubble">
      <p>{message.content}</p>
      <small>{new Date(message.createdAt).toLocaleString()}</small>
    </div>
  );
};

export default MessageBubble;

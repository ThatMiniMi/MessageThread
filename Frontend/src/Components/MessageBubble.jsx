import React from 'react';

const MessageBubble = ({ message, currentUserId }) => {
  const isSent = message.senderId === currentUserId;

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm 
        ${isSent ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-900 rounded-bl-none'}`}>
        <div className="font-semibold text-xs mb-1">{isSent ? 'You' : message.sender}</div>
        <div>{message.text}</div>
        <div className="text-[10px] text-gray-600 mt-1 text-right">
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default MessageBubble;

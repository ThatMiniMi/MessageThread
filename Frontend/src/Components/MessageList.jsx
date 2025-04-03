import { useState, useEffect } from 'react';
import axiosInstance from '../axios';

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axiosInstance.get('/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the messages!", error);
      });
  }, []);

  return (
    <div>
      <h1>Message Thread</h1>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            <strong>{message.userName}: </strong>{message.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
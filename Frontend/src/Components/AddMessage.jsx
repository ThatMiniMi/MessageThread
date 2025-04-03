import { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

function AddMessage() {
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance.post('/messages', { userName, content })
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.error("There was an error adding the message!", error);
      });
  };

  return (
    <div>
      <h1>Add a New Message</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddMessage;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MessageList from './components/MessageList';
import AddMessage from './components/AddMessage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MessageList />} />
        <Route path="/add" element={<AddMessage />} />
      </Routes>
    </Router>
  );
}

export default App;

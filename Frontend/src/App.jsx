import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./Components/Navbar";
import MessageList from "./Components/MessageList";
import AddMessage from "./Components/AddMessage";
import RegisterPage from "./Components/RegisterPage";
import LoginPage from "./Components/LoginPage";
import UserList from "./Components/UserList";

const queryClient = new QueryClient();

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <div className="max-w-xl mx-auto p-4 space-y-8">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/messages" element={
              <ProtectedRoute
                element={
                  <div>
                    <AddMessage onMessageAdded={() => setRefresh((prev) => !prev)} />
                    <MessageList key={refresh} />
                  </div>
                }
              />
            } />
            <Route path="/users" element={<UserList />} />
            <Route path="/" element={isLoggedIn ? <Navigate to="/messages" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;


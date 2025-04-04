import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./Components/Navbar";
import MessageThread from "./Components/MessageThread";
import AddUser from "./Components/AddUser";
import LoginPage from "./Components/LoginPage";

const queryClient = new QueryClient();

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleLogin = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <div className="max-w-xl mx-auto p-4 space-y-8">
          <Routes>
            <Route path="/register" element={<AddUser />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/messages" element={<MessageThread />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./Components/Navbar";
import MessageList from "./Components/MessageList";
import AddMessage from "./Components/AddMessage";
import RegisterPage from "./Components/RegisterPage"; // Register page component
import LoginPage from "./Components/LoginPage"; // Login page component
import AddUser from "./Components/AddUser"; // AddUser component for adding users
import UserList from "./Components/UserList"; // List users component

const queryClient = new QueryClient();

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {/* Render Navbar only on message-related routes */}
        <Navbar />
        
        <div className="max-w-xl mx-auto p-4 space-y-8">
          <Routes>
            {/* Routes for Login and Register pages */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Message thread page */}
            <Route path="/messages" element={
              // Check if user is logged in (i.e., token exists)
              localStorage.getItem('token') ? (
                <div>
                  <AddMessage onMessageAdded={() => setRefresh((prev) => !prev)} />
                  <MessageList key={refresh} />
                </div>
              ) : (
                // Redirect to login page if not authenticated
                <LoginPage />
              )
            } />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
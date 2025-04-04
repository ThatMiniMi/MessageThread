import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./Components/Navbar";
import MessageList from "./Components/MessageList";
import AddMessage from "./Components/AddMessage";
import RegisterPage from "./Components/RegisterPage";
import LoginPage from "./Components/LoginPage";
import AddUser from "./Components/AddUser";
import UserList from "./Components/UserList";

const queryClient = new QueryClient();

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <div className="max-w-xl mx-auto p-4 space-y-8">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/messages" element={
              localStorage.getItem('token') ? (
                <div>
                  <AddMessage onMessageAdded={() => setRefresh((prev) => !prev)} />
                  <MessageList key={refresh} />
                </div>
              ) : (
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
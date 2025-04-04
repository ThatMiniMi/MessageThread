import React, { useState } from "react";
import axios from "axios";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (username === "john_doe" && password === "johnpassword") ||
      (username === "jane_doe" && password === "janepassword")
    ) {
      localStorage.setItem("token", "mocked-jwt-token");
      onLogin();
      console.log("Login successful!");
      return;
    }

    try {
      const res = await axios.post("/api/users/login", { username, password });
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        onLogin();
        console.log("Login successful!");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
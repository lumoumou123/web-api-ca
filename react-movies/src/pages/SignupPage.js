import React, { useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/users?action=register", {
        username,
        password,
      });
      setMessage(response.data.msg || "User registered successfully!");
    } catch (error) {
      setMessage(error.response?.data?.msg || "Signup failed.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupPage;

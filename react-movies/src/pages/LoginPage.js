import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 用于导航到其他页面
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 用于页面跳转

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/users", {
        username,
        password,
      });
      const { token } = response.data;

      if (token) {
        // 将 JWT token 保存到 localStorage 中
        localStorage.setItem("token", token);

        // 显示成功信息并跳转到主页
        setMessage("Login successful!");
        navigate("/"); // 登录成功后跳转到主页
      }
    } catch (error) {
      setMessage(
        error.response?.data?.msg || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;

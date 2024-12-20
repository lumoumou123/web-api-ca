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
      console.log("Attempting login with:", { username, password }); // 打印请求数据
      const response = await axios.post("http://localhost:8080/api/users", {
        username,
        password,
      });
      console.log("Login response:", response.data); // 打印响应数据

      const { token, userId } = response.data; // 从响应中获取 token 和 userId

      if (token) {
        // 保存 token 和 userId 到 localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId); // 保存 userId

        console.log("Token and UserId saved to localStorage.");
        setMessage("Login successful!");
        navigate("/"); // 跳转到主页
      }
    } catch (error) {
      console.error("Login error:", error); // 打印错误信息
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


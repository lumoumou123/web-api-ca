import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // 检查用户是否已登录 (检查 token 是否存在)
  const token = localStorage.getItem("token");

  if (!token) {
    // 如果未登录，则重定向到登录页面
    return <Navigate to="/login" replace />;
  }

  // 如果已登录，则允许访问
  return children;
};

export default ProtectedRoute;

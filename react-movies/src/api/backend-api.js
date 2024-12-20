import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// 获取所有用户
export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/api/users`);
  return response.data;
};

// 获取用户收藏的电影列表
export const getUserFavourites = async (userId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please login.");

  const response = await axios.get(`http://localhost:8080/api/users/${userId}/favourites`, {
    headers: {
      Authorization: token, // 确保带上 "Bearer " 前缀
    },
  });
  return response.data;
};
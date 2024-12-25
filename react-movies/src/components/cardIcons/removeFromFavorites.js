import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromFavorites = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("You need to log in to remove from favorites!");
      return;
    }

    try {
      // 发送 DELETE 请求到后端 API
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}/favourites/${movie.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Movie removed from favorites:", data);
        // 调用上下文的 removeFromFavorites 方法更新前端状态
        context.removeFromFavorites(movie);
      } else {
        const errorData = await response.json();
        console.error("Failed to remove movie:", errorData);
        alert(errorData.msg || "Failed to remove from favorites.");
      }
    } catch (err) {
      console.error("Error removing from favorites:", err.message);
      alert("An error occurred while removing from favorites.");
    }
  };

  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;

import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToFavorites = async (e) => {
    e.preventDefault();
    console.log("Adding to favorites:", movie);

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User not logged in or token not available.");
      alert("You need to log in to add favorites!");
      return;
    }

    try {
      // 发送 POST 请求到后端，添加收藏
      const response = await fetch(`http://localhost:8080/api/users/${userId}/favourites`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: movie.id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Movie added to favourites successfully:", data);

        // 更新前端状态
        context.addToFavorites(movie);
      } else {
        const errorData = await response.json();
        console.error("Failed to add movie to favourites:", errorData);
        alert(errorData.msg || "Failed to add to favourites.");
      }
    } catch (err) {
      console.error("Error adding to favourites:", err.message);
      alert("An error occurred while adding to favourites.");
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;

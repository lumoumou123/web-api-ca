import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToPlaylist = async (e) => {
    e.preventDefault();
    console.log("Adding to playlist:", movie);

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User not logged in or token not available.");
      alert("You need to log in to add movies to your watchlist!");
      return;
    }

    try {
      // 发送 POST 请求到后端，添加到 Watchlist
      const response = await fetch(`http://localhost:8080/api/watchlist`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, movieId: movie.id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Movie added to watchlist successfully:", data);

        // 更新前端状态
        context.addToUpcoming(movie);
      } else {
        const errorData = await response.json();
        console.error("Failed to add movie to watchlist:", errorData);
        alert(errorData.msg || "Failed to add to watchlist.");
      }
    } catch (err) {
      console.error("Error adding to watchlist:", err.message);
      alert("An error occurred while adding to watchlist.");
    }
  };

  return (
    <IconButton aria-label="add to playlist" onClick={handleAddToPlaylist}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;



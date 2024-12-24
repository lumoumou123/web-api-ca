import React from "react";

const RemoveFromWatchlistIcon = ({ movie }) => {
  const handleRemove = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        throw new Error("User not logged in or token not available.");
      }

      const response = await fetch(
        `http://localhost:8080/api/watchlist/${userId}/${movie.id}`, // 使用 TMDB 的 movieId
        {
          method: "DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Movie removed from watchlist!");
      window.location.reload(); // 刷新页面以更新 UI
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <button onClick={handleRemove}>
      Remove
    </button>
  );
};

export default RemoveFromWatchlistIcon;

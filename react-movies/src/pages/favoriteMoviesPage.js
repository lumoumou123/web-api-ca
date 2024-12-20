import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const [favorites, setFavorites] = useState([]); // 收藏的电影列表
  const [isLoading, setIsLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态

  useEffect(() => {
    const fetchFavorites = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (!userId || !token) {
                throw new Error("User not logged in or token not available");
            }

            const response = await fetch(
                `http://localhost:8080/api/users/${userId}/favourites`,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setFavorites(data.favourites || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    fetchFavorites();
}, []);


  if (isLoading) {
    return <h4>Loading your favorite movies...</h4>;
  }

  if (error) {
    return <h4 style={{ color: "red" }}>Error: {error}</h4>;
  }

  if (favorites.length === 0) {
    return <h4>No favorite movies found. Add some to your favorites!</h4>;
  }

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={favorites}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;


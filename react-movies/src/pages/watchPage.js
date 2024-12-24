import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlistIcon"; // 假设已经实现了这个组件

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]); // Watchlist 数据
  const [isLoading, setIsLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          throw new Error("User not logged in or token not available");
        }

        const response = await fetch(
          `http://localhost:8080/api/watchlist/${userId}`,
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
        setWatchlist(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  if (isLoading) {
    return <h4>Loading your watchlist...</h4>;
  }

  if (error) {
    return <h4 style={{ color: "red" }}>Error: {error}</h4>;
  }

  if (watchlist.length === 0) {
    return <h4>No movies in your watchlist yet. Add some movies!</h4>;
  }

  return (
    <PageTemplate
      title="My Watchlist"
      movies={watchlist}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchlist movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchlistPage;

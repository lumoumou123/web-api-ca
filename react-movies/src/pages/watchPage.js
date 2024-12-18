import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { MoviesContext } from "../contexts/moviesContext";

const WatchlistPage = () => {
  const { upcoming } = useContext(MoviesContext);

  return (
    <PageTemplate
      title="My Watchlist"
      movies={upcoming}
    />
  );
};

export default WatchlistPage;

import React from "react";
import { getUpcomingMoviesFromBackend } from "../api/backend-api"; 
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/AddToPlaylistIcon'; 

const UpcomingPage = () => {
  const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMoviesFromBackend);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />;
      }}
    />
  );
};

export default UpcomingPage;


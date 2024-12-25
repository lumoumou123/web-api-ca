import React from "react";
import { useQuery } from 'react-query';
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/AddToPlaylistIcon';
import { getPopularMoviesFromBackend } from "../api/backend-api"; // 修改为从后端获取

const PopularMoviesPage = () => {
  // 修改使用从后端获取的函数
  const { data, error, isLoading, isError } = useQuery('popular', getPopularMoviesFromBackend);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />;
      }}
    />
  );
};

export default PopularMoviesPage;

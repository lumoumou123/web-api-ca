import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const HomePage = () => {
  // 使用 React Query 来获取电影数据
  const { data, error, isLoading, isError } = useQuery('discover', getMovies);

  // 显示加载指示器
  if (isLoading) {
    return <Spinner />;
  }

  // 显示错误信息
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // 获取电影数据
  const movies = data?.results || [];

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}           
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default HomePage;

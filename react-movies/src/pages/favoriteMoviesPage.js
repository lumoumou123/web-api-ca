import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  // 从 Context 中获取收藏的电影
  const { favorites } = useContext(MoviesContext);

  // 如果没有收藏的电影，显示提示
  if (favorites.length === 0) {
    return <h4>No favorite movies. Add some!</h4>;
  }

  // 使用收藏的电影来渲染页面
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

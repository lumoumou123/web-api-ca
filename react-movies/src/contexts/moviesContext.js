import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const addToFavorites = (movie) => {
    if (!favorites.some((m) => m.id === movie.id)) {
      setFavorites([...favorites, movie]);
      console.log("Updated favorites:", [...favorites, movie]);
    }
  };
  

  const [upcoming, setUpcoming] = useState([]);

  const addToUpcoming = (movie) => {
    if (!upcoming.some((m) => m.id === movie.id)) {
      setUpcoming([...upcoming, movie]);
    }
    console.log(upcoming);
  };

  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((m) => m.id !== movie.id));
  };

  const [myReviews, setMyReviews] = useState({});
  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        upcoming,
        addToUpcoming,
        removeFromFavorites,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;

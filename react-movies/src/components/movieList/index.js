import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "../movieCard";

const MovieList = ({ movies, action }) => {
  return (
    <Grid container spacing={2}>
      {movies.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={6} lg={6}>
          <MovieCard movie={m} action={action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;

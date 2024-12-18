import React from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import ActorList from "../components/actorlist";
import Grid from "@mui/material/Grid";

const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  const { data: actors, error: actorError, isLoading: actorIsLoading, isError: actorIsError } = useQuery(
    ["credit", { id: id }],
    getMovieCredits
  );

  if (isLoading || actorIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  if (actorIsError) {
    return <h1>{actorError.message}</h1>;
  }

  return (
    <>
      {movie && actors ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <Grid container spacing={2} sx={{ marginTop: "20px" }}>
              <ActorList casts={actors.cast} />
            </Grid>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;

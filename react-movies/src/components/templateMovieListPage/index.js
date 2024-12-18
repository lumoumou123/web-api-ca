import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // 每页显示8个电影
  const genreId = Number(genreFilter);

  // 筛选电影
  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return releaseYearFilter ? m.release_date.startsWith(releaseYearFilter) : true;
    });

  // 排序电影
  if (sortOption === "rating") {
    displayedMovies.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortOption === "rating_desc") {
    displayedMovies.sort((a, b) => a.vote_average - b.vote_average);
  }

  // 分页处理
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMovies = displayedMovies.slice(startIndex, endIndex);

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "releaseYear") setReleaseYearFilter(value);
    else if (type === "sort") setSortOption(value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Grid container spacing={2}>
      {/* 页头 */}
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>

      {/* 筛选面板 */}
      <Grid item xs={12} md={3}>
        <FilterCard
          onUserInput={handleChange}
          titleFilter={nameFilter}
          genreFilter={genreFilter}
          releaseYearFilter={releaseYearFilter}
        />
        <FormControl sx={{ marginTop: 2, minWidth: 220 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sortOption}
            label="Sort By"
            onChange={(e) => handleChange("sort", e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="rating">Rating (High to Low)</MenuItem>
            <MenuItem value="rating_desc">Rating (Low to High)</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* 电影列表 */}
      <Grid item xs={12} md={9}>
        <MovieList action={action} movies={paginatedMovies} />
        <Stack spacing={2} sx={{ marginTop: 3, alignItems: "center" }}>
          <Pagination
            count={Math.ceil(displayedMovies.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;

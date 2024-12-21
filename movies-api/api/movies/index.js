import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getMovieGenres
  } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    [page, limit] = [+page, +limit];

    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit),
    ]);

    const total_pages = Math.ceil(total_results / limit);
    res.status(200).json({ page, total_pages, total_results, results });
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    // 优先从 MongoDB 获取
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        return res.status(200).json(movie);
    }

    // 如果 MongoDB 没有该电影，则从 TMDB 获取
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
    );

    if (!response.ok) {
        return res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }

    const movieData = await response.json();
    res.status(200).json(movieData);
}));
// Get upcoming movies from TMDB
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    try {
        const upcomingMovies = await getUpcomingMovies();
        res.status(200).json(upcomingMovies);
    } catch (error) {
        console.error('Error fetching upcoming movies:', error.message);
        res.status(500).json({ message: 'Failed to fetch upcoming movies from TMDB.', error: error.message });
    }
}));

// 新增：获取电影流派列表
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    try {
        const genres = await getMovieGenres();
        res.status(200).json(genres);
    } catch (error) {
        console.error('Error fetching movie genres:', error.message);
        res.status(500).json({ message: 'Failed to fetch movie genres from TMDB.', error: error.message });
    }
}));

//从 TMDB 获取当前流行电影的列表。
router.get('/popular', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&page=${page}`
    );

    if (!response.ok) {
        return res.status(response.status).json({ message: 'Failed to fetch popular movies from TMDB.' });
    }

    const data = await response.json();
    res.status(200).json(data);
}));


export default router;

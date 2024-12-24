import express from 'express';
import asyncHandler from 'express-async-handler';
import Watchlist from './watchlistModel';

const router = express.Router();

// 添加电影到用户的 Watchlist
router.post('/', asyncHandler(async (req, res) => {
    const { userId, movieId } = req.body;
  
    if (!userId || !movieId) {
      return res.status(400).json({ success: false, msg: 'User ID and Movie ID are required.' });
    }
  
    const existingEntry = await Watchlist.findOne({ userId, movieId });
    if (existingEntry) {
      return res.status(400).json({ success: false, msg: 'Movie already in watchlist.' });
    }
  
    const watchlistEntry = new Watchlist({ userId, movieId });
    await watchlistEntry.save();
    res.status(201).json({ success: true, msg: 'Movie added to watchlist.', data: watchlistEntry });
  }));
  

// 获取用户 Watchlist（包含 TMDB 数据）
router.get("/:userId", asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // 查询数据库中用户的 Watchlist
  const watchlistEntries = await Watchlist.find({ userId });
  if (!watchlistEntries || watchlistEntries.length === 0) {
    return res.status(200).json({ success: true, data: [] });
  }

  // 从 TMDB 获取详细信息
  const movieDetails = await Promise.all(
    watchlistEntries.map(async (entry) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${entry.movieId}?api_key=${process.env.TMDB_KEY}`
      );
      const movieData = await response.json();
      return {
        ...movieData,
        addedAt: entry.addedAt, // 保留数据库的添加时间
      };
    })
  );

  res.status(200).json({ success: true, data: movieDetails });
}));


  //删除用户的watchlist
  router.delete("/:userId/:movieId", asyncHandler(async (req, res) => {
    const { userId, movieId } = req.params;
  
    const deleted = await Watchlist.findOneAndDelete({ userId, movieId });
  
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, msg: "Movie not found in watchlist." });
    }
  
    res.status(200).json({ success: true, msg: "Movie removed from watchlist." });
  }));
export default router;

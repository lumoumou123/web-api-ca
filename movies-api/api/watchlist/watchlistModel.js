import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 用户 ID
  movieId: { type: Number, required: true }, // 电影 ID
  addedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Watchlist', WatchlistSchema);

import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));


// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

// 获取用户收藏的电影列表
router.get('/:id/favourites', asyncHandler(async (req, res) => {
    const userId = req.params.id; // 获取参数中的用户 ID
  
    const user = await User.findById(userId); // 从 MongoDB 获取用户信息
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found.' });
    }
  
    res.status(200).json({ success: true, favourites: user.favourites });
  }));

// 添加电影到用户收藏列表
router.post('/:id/favourites', asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { movieId } = req.body;
  
    if (!movieId) {
      return res.status(400).json({ success: false, msg: 'Movie ID is required.' });
    }
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found.' });
    }
  
    if (!user.favourites.includes(movieId)) {
      await User.updateOne(
        { _id: userId },
        { $push: { favourites: movieId } } // 使用 $push 更新 favourites
      );
      return res.status(200).json({ success: true, msg: 'Movie added to favourites.' });
    } else {
      return res.status(400).json({ success: false, msg: 'Movie already in favourites.' });
    }
  }));
  
  
//添加电影评论
router.post('/:id/reviews', asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { movieId, review, rating } = req.body;

    if (!movieId || !review || rating === undefined) {
        return res.status(400).json({ message: "Movie ID, review, and rating are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    // 更新 reviews 字段
    await User.updateOne(
        { _id: userId },
        { $push: { reviews: { movieId, review, rating } } } // 使用 $push 添加新的评论
    );

    res.status(201).json({ message: "Review added successfully." });
}));


//获取电影评论
router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ reviews: user.reviews });
}));

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}



export default router;
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
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, msg: 'User not found.' });
    }

    const favourites = user.favourites || [];
    console.log('Favourites to fetch:', favourites);

    const movieDetails = await Promise.all(
        favourites.map(async (movieId) => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}`
                );
                if (response.ok) {
                    const movie = await response.json();
                    console.log('Fetched movie:', movie);
                    return movie;
                } else {
                    console.error(`Failed to fetch movie details for ID: ${movieId}`);
                    return null;
                }
            } catch (error) {
                console.error(`Error fetching movie ID ${movieId}:`, error.message);
                return null;
            }
        })
    );

    const filteredDetails = movieDetails.filter((movie) => movie !== null);
    res.status(200).json({ success: true, favourites: filteredDetails });
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

    console.log('Current favourites before update:', user.favourites);

    if (!user.favourites.includes(movieId)) {
        await User.updateOne(
            { _id: userId },
            { $push: { favourites: movieId } }
        );
        console.log(`Movie ${movieId} added to favourites.`);
        return res.status(200).json({ success: true, msg: 'Movie added to favourites.' });
    } else {
        console.log(`Movie ${movieId} already exists in favourites.`);
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
    try {
        // 查找用户
        const user = await User.findByUserName(req.body.username);
        if (!user) {
            return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
        }

        // 验证密码
        const isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            // 生成没有有效期的 JWT 令牌
            const token = jwt.sign(
                { username: user.username, userId: user._id }, // 包含用户名和用户ID
                process.env.SECRET
            );

            // 成功响应，返回 token 和 userId
            res.status(200).json({
                success: true,
                token: 'BEARER ' + token,
                userId: user._id // 返回用户的唯一 ID
            });
        } else {
            res.status(401).json({ success: false, msg: 'Wrong password.' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}




export default router;
import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const authenticate = async (request, response, next) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).json({ error: 'Authorization header is missing' });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return response.status(401).json({ error: 'Bearer token not provided' });
        }

        const decoded = await jwt.verify(token, process.env.SECRET);
        if (!decoded || !decoded.username) {
            return response.status(401).json({ error: 'Invalid token' });
        }

        // Assuming decoded contains a username field
        const user = await User.findByUserName(decoded.username);
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        // Optionally attach the user to the request for further use
        request.user = user;
        next();
    } catch (err) {
        console.error('Authentication Error:', err.message);
        return response.status(401).json({ error: `Authentication failed: ${err.message}` });
    }
};

export default authenticate;

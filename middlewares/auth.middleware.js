const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Extract the token from the "Bearer <token>" format
    const actualToken = token.split(' ')[1];

    try {
        const decoded = jwt.verify(actualToken, JWT_SECRET);
        req.user = decoded.user; // Assuming your token contains user info
        next();
    } catch (err) {
        // console.log(err);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

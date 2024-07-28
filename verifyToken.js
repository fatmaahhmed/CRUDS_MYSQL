// verifyToken.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const verifyTokenImplementation = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { valid: true, decoded };
    } catch (err) {
        return { valid: false, error: err.message };
    }
};

module.exports = () => {
    return (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        const { valid, decoded, error } = verifyTokenImplementation(token);

        if (!valid) {
            return res.status(403).json({ message: 'Invalid token', error });
        }

        req.user = decoded;
        next();
    };
};

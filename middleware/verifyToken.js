const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Token is not provided' });
    }

    const token = authHeader.split(' ')[1];
    

    if (!token) {
      return res.status(401).json({ message: 'Token is not provided' });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.decoded=decoded
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;

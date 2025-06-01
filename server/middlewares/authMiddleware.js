const jwt = require('jsonwebtoken');
const User = require('../models/User'); // adjust path as per your structure

const authenticate = async (req, res, next) => {
const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith('Bearer ')) {
return res.status(401).json({ message: 'Authorization token missing or malformed' });
}

const token = authHeader.split(' ')[1];

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be in your .env
// Optional: attach full user data (or just id) to req
req.user = await User.findById(decoded.id).select('-password');

if (!req.user) {
  return res.status(401).json({ message: 'User not found' });
}

next();
} catch (error) {
return res.status(401).json({ message: 'Invalid or expired token' });
}
};

module.exports = authenticate;
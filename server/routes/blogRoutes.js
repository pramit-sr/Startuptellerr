const express = require('express');
const router = express.Router();

// Controller functions
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

// Authentication middleware
const authenticate = require('../middlewares/authMiddleware'); // Adjust path if needed



router.get('/', getAllBlogs);

router.get('/:id', getBlogById);

router.post('/', authenticate, createBlog);

router.put('/:id', authenticate, updateBlog);

router.delete('/:id', authenticate, deleteBlog);

module.exports = router;

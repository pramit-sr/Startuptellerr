const Blog = require('../models/Blog');
const cloudinary = require('../config/cloudinary');

// Create a new blog with optional image
exports.createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    let imageUrl = '';

    // Upload image if provided
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: 'blogs',
      });
      imageUrl = uploadResponse.secure_url;
    }

    const blog = new Blog({
      title,
      content,
      image: imageUrl,
      author: req.user.id, // assuming req.user is set by auth middleware
    });

    await blog.save();
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog', error });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'firstName email');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error });
  }
};

// Get single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'firstName email');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
};

// Update blog by ID with optional image
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    let updatedFields = { title, content };

    // Upload new image if provided
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: 'blogs',
      });
      updatedFields.image = uploadResponse.secure_url;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
};

// Delete blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};

// src/components/BlogList.jsx
import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;

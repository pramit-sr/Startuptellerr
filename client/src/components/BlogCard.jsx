import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const previewText =
    blog.content.length > 150
      ? `${blog.content.substring(0, 150)}...`
      : blog.content;

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
      onClick={() => navigate(`/blog/${blog._id}`)} // 👈 Navigate to blog details
    >
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-52 object-cover mb-4 rounded"
        />
      )}
      <h3 className="text-2xl font-bold mb-2">{blog.title}</h3>
      <p className="text-sm text-gray-600 mb-2">
        By: {blog.author?.firstName} {blog.author?.lastName || ''} ({blog.author?.email})
      </p>
      <p className="text-gray-800">{previewText}</p>
    </div>
  );
};

export default BlogCard;

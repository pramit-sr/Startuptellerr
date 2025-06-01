import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then(res => {
        console.log('Blog details:', res.data); // Debug: log response
        setBlog(res.data.blog || res.data); // Adjust based on response shape
      })
      .catch(err => console.error('Failed to fetch blog:', err));
  }, [id]);

 const handleDelete = () => {
  const token = localStorage.getItem('token'); // or your auth context

  if (!token) {
    alert('You must be logged in to delete a blog');
    return;
  }

  axios.delete(`http://localhost:5000/api/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  .then(() => navigate('/'))
  .catch(err => {
    console.error('Failed to delete blog:', err.response || err.message || err);
    alert('Failed to delete blog. Check console for details.');
  });
};


  if (!blog) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Blog Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover rounded mb-6"
        />
      )}

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-blue-700 mb-4">{blog.title}</h1>

      {/* Author */}
      <p className="text-sm text-gray-600 mb-6">
        By: <i>
          {typeof blog.author === 'object'
            ? `${blog.author.firstName} ${blog.author.lastName} (${blog.author.email})`
            : blog.author}
        </i>
      </p>

      {/* Blog Content */}
      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-8">{blog.content}</p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;

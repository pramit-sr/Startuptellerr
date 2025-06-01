import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BlogForm from '../components/BlogForm';
import Loader from '../components/Loader';

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then(res => {
        console.log('GET blog response:', res.data);
        // Adjust according to your API response structure:
        setBlog(res.data.blog || res.data);
      })
      .catch(err => console.error('Failed to fetch blog:', err.response?.data || err.message));
  }, [id]);

  const handleSubmit = (updatedData) => {
  const token = localStorage.getItem('token'); // adjust this based on where you store the token

  axios.put(`http://localhost:5000/api/blogs/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,  // common format for JWT token
    }
  })
  .then(() => navigate(`/blog/${id}`))
  .catch(err => console.error('Failed to update blog:', err.response?.data || err.message));
};


  if (!blog) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Blog</h1>
      <BlogForm initialData={blog} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditBlog;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageBase64 = '';
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        imageBase64 = reader.result;

        try {
          const res = await fetch('http://localhost:5000/api/blogs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content, image: imageBase64 }),
          });

          if (res.ok) {
            navigate('/');
          } else {
            const data = await res.json();
            alert(data.message);
          }
        } catch (err) {
          console.error('Error creating blog:', err);
          alert('Something went wrong.');
        }
      };
    } else {
      // No image uploaded
      try {
        const res = await fetch('http://localhost:5000/api/blogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
          navigate('/');
        } else {
          const data = await res.json();
          alert(data.message);
        }
      } catch (err) {
        console.error('Error creating blog:', err);
        alert('Something went wrong.');
      }
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full border p-2 rounded"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;

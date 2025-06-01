import React, { useEffect, useState } from 'react';
import BlogList from '../components/BlogList';
import Loader from '../components/Loader';
import HeroSection from './HeroSection';

const Body = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState(['Startups', 'Failure', 'Tech', 'Productivity', 'AI']); // example tags

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Blog Section */}
      <div className="flex px-6 py-10 gap-6">
        {/* Left - Blog List */}
        <div className="w-full md:w-[70%]">
          <h1 className="text-3xl font-bold mb-4">Latest Blogs</h1>
          {loading ? <Loader /> : <BlogList blogs={blogs} />}
        </div>

        {/* Right - Sidebar with Tags */}
        <div className="hidden md:block w-[30%] bg-gray-100 p-4 rounded-lg h-fit sticky top-4">
          <h2 className="text-xl font-semibold mb-3">Popular Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;

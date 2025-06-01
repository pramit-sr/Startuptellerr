import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero-illustration.png'; // Replace with your image path

const HeroSection = () => {
  const navigate = useNavigate();

  const handleCreateBlog = () => {
    navigate('/create');
  };

  return (
    <section className="bg-[#0f1c3f] text-white py-16 px-8 rounded-lg shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Text Section */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Startup pulse decoded—<br />trendy, bold, blog.
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            StartupTellerr helps you capture, share, and explore real startup stories, lessons, and milestones—one post at a time.
          </p>

          {/* CTA Input */}
          <div className="flex bg-[#1d2b53] p-1 rounded-full w-full max-w-md mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 bg-transparent outline-none text-white placeholder-gray-400"
            />
            <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition">
              Get Started
            </button>
          </div>

          {/* Create Blog Button */}
          <button
            onClick={handleCreateBlog}
            className="mt-2 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            ✍️ Create Your Own Blog
          </button>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={heroImg}
            alt="Illustration"
            className="w-[90%] max-w-md rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

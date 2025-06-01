import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
const [formData, setFormData] = useState({
firstName: '',
lastName: '',
email: '',
password: '',
});

const navigate = useNavigate();

const handleChange = (e) => {
setFormData((prev) => ({
...prev,
[e.target.name]: e.target.value,
}));
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
  const res = await fetch('http://localhost:5000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (res.ok) {
    alert('Signup successful!');
    navigate('/login');
  } else {
    alert(data.message || 'Signup failed');
  }
} catch (error) {
  console.error('Signup error:', error);
  alert('Something went wrong!');
}
};

return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950 px-4">
<div className="bg-gray-900 text-white rounded-lg shadow-lg p-8 w-full max-w-md">
<h2 className="text-3xl font-bold text-center text-blue-400 mb-2">Join StartupTellerr Today!</h2>
<p className="text-center text-gray-400 mb-6">Your gateway to the startup universe.</p>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-1">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="name@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 transition duration-200 text-white font-semibold py-2 rounded-md"
      >
        Sign Up
      </button>
    </form>

    <p className="mt-4 text-sm text-center text-gray-400">
      Already have an account?{' '}
      <Link to="/login" className="text-blue-400 hover:underline">
        Login Here
      </Link>
    </p>
  </div>
</div>
);
};

export default Signup;
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user info is in localStorage (or fetch from a context/store)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // optionally redirect or reload page
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex-shrink-0 text-2xl font-extrabold text-blue-700">
        <Link to="/">StartupTellerr</Link>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex space-x-8 justify-center flex-1">
        <Link to="/" className="text-gray-700 hover:text-blue-600 text-md">Home</Link>
        <Link to="/create" className="text-gray-700 hover:text-blue-600 text-md">Case Study</Link>
        <Link to="/create" className="text-gray-700 hover:text-blue-600 text-md">ST Dictionary</Link>
        <Link to="/create" className="text-gray-700 hover:text-blue-600 text-md">Contact</Link>
      </div>

      {/* Search and Auth Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {user ? (
          <>
            <span className="text-gray-700">Hello, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

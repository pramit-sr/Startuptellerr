import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import CreateBlog from '../src/pages/CreateBlog';
import EditBlog from '../src/pages/EditBlog';
import BlogDetails from '../src/pages/BlogDetails';
import Body from '../src/pages/Body'; // Body contains HeroSection inside
import Login from './pages/auth/login'; 
import Signup from './pages/auth/Signup'; // Import Signup component

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/edit/:id" element={<EditBlog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/login" element={<Login />} /> {/* Route for Login */}
            <Route path="/signup" element={<Signup />} /> {/* Route for Signup */}
             <Route path="/blog/:id" element={<BlogDetails />} /> {/* 👈 Blog detail route */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

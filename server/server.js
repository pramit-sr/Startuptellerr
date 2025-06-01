const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const session = require('express-session');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Optional: express-session setup if needed
app.use(session({
secret: process.env.SESSION_SECRET || 'startup_secret',
resave: false,
saveUninitialized: false,
}));

// Routes
app.use('/api/auth', authRoutes); // Login, Signup
app.use('/api/blogs', blogRoutes); // Blog CRUD operations

// Health check route
app.get('/', (req, res) => {
res.send('Startupteller API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
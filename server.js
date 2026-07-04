global.crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect Database 
// Note: Ensure your database connection in config/db.js catches errors 
// internally so it doesn't instantly crash the serverless function.
connectDB();

app.use(cors());

// Init Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// Root test route to easily verify deployment success
app.get('/', (req, res) => {
    res.json({ message: "Task Management Backend is running perfectly on Vercel!" });
});

const PORT = process.env.PORT || 5000;

// CRITICAL VERCEL FIX: Only listen to the port during local development.
// Vercel handles the server binding automatically via its serverless wrapper.
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

// CRITICAL VERCEL FIX: Export the app instance so Vercel can convert it into a serverless function.
module.exports = app;
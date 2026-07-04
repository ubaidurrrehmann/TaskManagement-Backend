const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("CRITICAL ERROR: MONGO_URI is not defined in Environment Variables!");
      return; 
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected successfully...');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    // DO NOT use process.exit(1); letting the app stay alive allows Vercel 
    // to give you detailed running logs instead of an unhelpful instant crash.
  }
};

module.exports = connectDB;
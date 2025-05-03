const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const todoRoutes = require('./routes/TodoRoutes.js');  // Importing todoRoutes
require('dotenv').config();

// Middleware
app.use(express.json());




// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Using the routes with the '/api' prefix
app.use('/api', todoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

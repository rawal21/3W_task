require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const MONGO_URL  = process.env.MONGO_URL;

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'https://dashing-tartufo-a72bbc.netlify.app', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
}));


// Database Connection
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/users', userRoutes);

app.get('/' , (req, res) => {
  res.send("hey servar is running")
})

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

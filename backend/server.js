const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.VERCEL_URL : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);

//test route
app.get("/api/ping", (req, res) => {
  console.log(process.env.NODE_ENV);
  console.log(process.env.VERCEL_URL);
  console.log(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  res.status(200).json({ message: "pong" });
});

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected!');
    app.listen(process.env.PORT || 5000, () => console.log('🚀 Server running on http://localhost:5000'))
  })
  .catch(err => console.error('❌ DB Error:', err));

  //for commiting
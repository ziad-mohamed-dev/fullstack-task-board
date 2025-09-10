const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

// Validate environment variables early
const { validateEnv } = require('./config/env');
// eslint-disable-next-line no-unused-vars
const env = validateEnv();

const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false // Needed for certain frontend features
}));

// Compression middleware
app.use(compression());

// Rate limiting for all API routes
app.use('/api', apiLimiter);

app.use(cookieParser());

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);

//test route
app.get('/api/ping', (req, res) => {
  res.status(200).json({
    message: 'pong',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Error handling middlewares (must be last)
app.use(notFound);
app.use(errorHandler);

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected!');
    app.listen(process.env.PORT || 5000, () => console.log('🚀 Server running on http://localhost:5000'));
  })
  .catch(err => console.error('❌ DB Error:', err));

//for commiting

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import goalsRouter from './server/routes/goals.js';
import authRouter from './server/routes/auth.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express app
const app = express();

// Configure mongoose
mongoose.set('strictQuery', true);

// MongoDB connection with serverless optimizations
const connectDB = async () => {
  try {
    // Skip if already connected or connecting
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      family: 4
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    throw error;
  }
};

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(limiter);

// Diagnostic endpoints
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API is working',
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      mongodbUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
      jwtSecret: process.env.JWT_SECRET ? 'Set' : 'Not set'
    }
  });
});

app.get('/api/test-db', async (req, res) => {
  try {
    const conn = await connectDB();
    res.json({
      dbState: mongoose.connection.readyState,
      stateMessage: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState],
      host: conn.connection.host,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Database connection middleware
const checkDbConnection = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error in middleware:', error);
    return res.status(503).json({
      message: 'Database connection not available',
      error: process.env.NODE_ENV === 'development' ? error.message : 'db_connection_error'
    });
  }
};

// Static files
app.use(express.static(join(__dirname, 'dist')));

// API routes
app.use('/api/auth', checkDbConnection, authRouter);
app.use('/api/goals', checkDbConnection, goalsRouter);

// Client-side routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Performing graceful shutdown...');
  mongoose.connection.close();
  process.exit(0);
});

// Development server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Development server running on port ${PORT}`);
  });
}

export default app;

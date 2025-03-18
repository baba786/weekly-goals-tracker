import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import goalsRouter from './server/routes/goals.js';
import authRouter from './server/routes/auth.js';
import { initStorage } from './server/storage/fileStore.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(limiter);

// Add test endpoints for debugging
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.get('/api/test-storage', async (req, res) => {
  try {
    // List all users in storage
    const usersDir = path.join(__dirname, 'server', 'storage', 'data', 'users');
    let users = [];
    try {
      const files = await fs.readdir(usersDir);
      
      // Get contents of each user file
      users = await Promise.all(
        files.map(async (file) => {
          try {
            const content = await fs.readFile(path.join(usersDir, file), 'utf8');
            const userData = JSON.parse(content);
            // Don't send password in response
            const { password, ...safeData } = userData;
            return { file, data: safeData };
          } catch (err) {
            return { file, error: err.message };
          }
        })
      );
    } catch (err) {
      console.error('Error reading users directory:', err);
    }
    
    res.json({ 
      status: 'File storage operational',
      timestamp: new Date().toISOString(),
      users,
      storageDir: usersDir
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Debug endpoint for login
app.post('/api/test-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    const usersDir = path.join(__dirname, 'server', 'storage', 'data', 'users');
    const files = await fs.readdir(usersDir);
    
    // Find user with matching email
    let foundUser = null;
    
    for (const file of files) {
      try {
        const content = await fs.readFile(path.join(usersDir, file), 'utf8');
        const userData = JSON.parse(content);
        
        if (userData.email === email) {
          foundUser = userData;
          break;
        }
      } catch (err) {
        console.error(`Error reading file ${file}:`, err);
      }
    }
    
    if (!foundUser) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Check password (simplified for testing)
    const [salt, storedHash] = foundUser.password.split(':');
    const hmac = crypto.createHmac('sha256', salt);
    hmac.update(password);
    const hashedPassword = hmac.digest('hex');
    const passwordMatch = storedHash === hashedPassword;
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    res.json({ 
      message: 'Login successful', 
      user: { 
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email 
      }
    });
  } catch (error) {
    console.error('Test login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Initialize file storage
const initializeStorage = async () => {
  try {
    await initStorage();
    console.log('File storage initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing file storage:', error);
    throw error;
  }
};

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// API routes
app.use('/api/auth', authRouter);
app.use('/api/goals', goalsRouter);

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Allow graceful shutdown
  setTimeout(() => process.exit(1), 1000);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Allow graceful shutdown
  setTimeout(() => process.exit(1), 1000);
});

// Start server
const startServer = async () => {
  try {
    await initializeStorage();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
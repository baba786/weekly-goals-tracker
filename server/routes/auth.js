import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Name validation
    if (name.length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters long' });
    }

    // Check database connection
    if (!mongoose.connection.readyState) {
      return res.status(503).json({ 
        message: 'Service temporarily unavailable. Please try again later.',
        error: 'db_connection'
      });
    }

    // Check if user exists
    let userExists;
    try {
      userExists = await User.findOne({ email }).maxTimeMS(5000).exec();
    } catch (error) {
      console.error('Error checking existing user:', error);
      return res.status(503).json({ 
        message: 'Error checking user existence. Please try again.',
        error: 'db_query'
      });
    }

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    let user;
    try {
      user = new User({ name, email, password });
      await user.save({ maxTimeMS: 10000 });
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.code === 11000) {
        return res.status(400).json({ 
          message: 'User already exists',
          error: 'duplicate'
        });
      }
      return res.status(503).json({ 
        message: 'Error creating user. Please try again.',
        error: 'db_save'
      });
    }

    // Generate token and send response
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Internal server error. Please try again later.',
      error: 'server_error'
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Check database connection
    if (!mongoose.connection.readyState) {
      return res.status(503).json({ 
        message: 'Service temporarily unavailable. Please try again later.',
        error: 'db_connection'
      });
    }

    // Find user
    let user;
    try {
      user = await User.findOne({ email }).maxTimeMS(5000).exec();
    } catch (error) {
      console.error('Error finding user:', error);
      return res.status(503).json({ 
        message: 'Error during login. Please try again.',
        error: 'db_query'
      });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    let isMatch;
    try {
      isMatch = await user.matchPassword(password);
    } catch (error) {
      console.error('Error verifying password:', error);
      return res.status(503).json({ 
        message: 'Error verifying credentials. Please try again.',
        error: 'password_verify'
      });
    }

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token and send response
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Internal server error. Please try again later.',
      error: 'server_error'
    });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d'
  });
};

export default router;
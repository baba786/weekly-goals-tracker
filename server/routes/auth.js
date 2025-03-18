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

    // Check if user exists
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
    } catch (error) {
      console.error('Error checking existing user:', error);
      return res.status(500).json({ 
        message: 'Error checking user existence. Please try again.',
        error: 'query_error'
      });
    }

    // Create new user
    try {
      const user = await User.create({ name, email, password });

      // Generate token and send response
      const token = generateToken(user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token
      });
    } catch (error) {
      console.error('Error creating user:', error);
      
      if (error.message === 'Email already exists') {
        return res.status(400).json({ 
          message: 'User already exists',
          error: 'duplicate'
        });
      }
      
      return res.status(500).json({ 
        message: 'Error creating user. Please try again.',
        error: error.message
      });
    }

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

    // Find user
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Verify password
      console.log('Attempting to verify password for:', user.email);
      console.log('Password in database:', user.password);
      
      const isMatch = await User.matchPassword(user, password);
      console.log('Password match result:', isMatch);

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
      console.error('Error during login:', error);
      return res.status(500).json({ 
        message: 'Error during login. Please try again.',
        error: error.message
      });
    }

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
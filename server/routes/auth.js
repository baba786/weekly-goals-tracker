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

    // Check if user exists with timeout
    const userExists = await Promise.race([
      User.findOne({ email }).maxTimeMS(10000),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database operation timeout')), 10000)
      )
    ]);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user with timeout
    const user = await Promise.race([
      User.create({
        name,
        email,
        password
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database operation timeout')), 15000)
      )
    ]);

    if (user) {
      // Generate token and send response
      const token = generateToken(user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token
      });
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message === 'Database operation timeout') {
      res.status(504).json({ 
        message: 'Registration request timed out. Please try again.',
        error: 'timeout'
      });
    } else if (error.code === 11000) {
      res.status(400).json({ 
        message: 'User already exists',
        error: 'duplicate'
      });
    } else {
      res.status(400).json({ 
        message: error.message,
        error: 'unknown'
      });
    }
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).maxTimeMS(5000);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await Promise.race([
      user.matchPassword(password),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Password verification timeout')), 5000)
      )
    ]);

    if (isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    if (error.message === 'Password verification timeout') {
      res.status(504).json({ message: 'Login request timed out. Please try again.' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d'
  });
};

export default router;
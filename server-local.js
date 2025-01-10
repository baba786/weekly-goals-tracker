import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Goal from './api/Goal.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Initialize in-memory storage for local development
console.log('Using in-memory storage for local development');
global.goals = [];

// Helper function to get week number
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// API Routes
app.get('/api/goals/current', (req, res) => {
  try {
    const now = new Date();
    const currentWeek = getWeekNumber(now);
    const currentYear = now.getFullYear();

    const goals = global.goals.filter(g => 
      g.weekNumber === currentWeek && g.year === currentYear
    ).sort((a, b) => a.createdAt - b.createdAt);

    res.json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: 'Failed to fetch goals' });
  }
});

app.post('/api/goals', (req, res) => {
  try {
    const now = new Date();
    const currentWeek = getWeekNumber(now);
    const currentYear = now.getFullYear();

    const goalsCount = global.goals.filter(g => 
      g.weekNumber === currentWeek && g.year === currentYear
    ).length;

    if (goalsCount >= 5) {
      return res.status(400).json({ message: 'Maximum 5 goals allowed per week' });
    }

    const newGoal = {
      _id: Math.random().toString(36).substr(2, 9),
      text: req.body.text,
      category: req.body.category || 'other',
      dueDate: req.body.dueDate || null,
      notes: req.body.notes || '',
      weekNumber: currentWeek,
      year: currentYear,
      completed: false,
      createdAt: new Date()
    };

    global.goals.push(newGoal);
    res.status(201).json(newGoal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(400).json({ message: 'Failed to create goal' });
  }
});

app.patch('/api/goals/:id', (req, res) => {
  try {
    const goalIndex = global.goals.findIndex(g => g._id === req.params.id);
    if (goalIndex === -1) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    
    global.goals[goalIndex].completed = !global.goals[goalIndex].completed;
    res.json(global.goals[goalIndex]);
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(400).json({ message: 'Failed to update goal' });
  }
});

// Serve static files in development
if (process.env.NODE_ENV === 'development') {
  app.use(express.static(join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
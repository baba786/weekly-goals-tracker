import express from 'express';
import Goal from '../models/Goal.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Get current week's goals
router.get('/current', async (req, res) => {
  try {
    const now = new Date();
    const currentWeek = getWeekNumber(now);
    const currentYear = now.getFullYear();

    const goals = await Goal.find({
      weekNumber: currentWeek,
      year: currentYear,
      user: req.user._id
    });
    
    // Sort by createdAt
    goals.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    res.json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add a new goal
router.post('/', async (req, res) => {
  try {
    const now = new Date();
    const currentWeek = getWeekNumber(now);
    const currentYear = now.getFullYear();

    const goalsCount = await Goal.countDocuments({
      weekNumber: currentWeek,
      year: currentYear,
      user: req.user._id
    });

    if (goalsCount >= 5) {
      return res.status(400).json({ message: 'Maximum 5 goals allowed per week' });
    }

    const newGoal = await Goal.create({
      text: req.body.text,
      weekNumber: currentWeek,
      year: currentYear,
      user: req.user._id
    });
    
    res.status(201).json(newGoal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(400).json({ message: error.message });
  }
});

// Toggle goal completion
router.patch('/:id/toggle', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    
    // Verify ownership
    if (goal.user !== req.user._id) {
      return res.status(403).json({ message: 'Not authorized to update this goal' });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, {
      completed: !goal.completed
    });
    
    res.json(updatedGoal);
  } catch (error) {
    console.error('Error toggling goal completion:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update goal text
router.patch('/:id', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Goal text is required' });
    }
    
    const goal = await Goal.findById(req.params.id);
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Make sure user owns this goal
    if (goal.user !== req.user._id) {
      return res.status(403).json({ message: 'Not authorized to update this goal' });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, {
      text: text.trim()
    });
    
    res.json(updatedGoal);
  } catch (error) {
    console.error('Error updating goal text:', error);
    res.status(400).json({ message: error.message });
  }
});

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

export default router;
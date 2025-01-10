import express from 'express';
import Goal from '../models/Goal.js';

const router = express.Router();

// Get current week's goals
router.get('/current', async (req, res) => {
  try {
    const now = new Date();
    const currentWeek = getWeekNumber(now);
    const currentYear = now.getFullYear();

    const goals = await Goal.find({
      weekNumber: currentWeek,
      year: currentYear
    }).sort({ createdAt: 1 });

    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new goal
router.post('/', async (req, res) => {
  try {
    const now = new Date();
    const currentWeek = getWeekNumber(now);
    const currentYear = now.getFullYear();

    // Check if we already have 5 goals for the current week
    const goalsCount = await Goal.countDocuments({
      weekNumber: currentWeek,
      year: currentYear
    });

    if (goalsCount >= 5) {
      return res.status(400).json({ message: 'Maximum 5 goals allowed per week' });
    }

    const goal = new Goal({
      text: req.body.text,
      weekNumber: currentWeek,
      year: currentYear
    });

    const newGoal = await goal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Toggle goal completion
router.patch('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    goal.completed = !goal.completed;
    const updatedGoal = await goal.save();
    res.json(updatedGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Helper function to get week number
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

export default router;
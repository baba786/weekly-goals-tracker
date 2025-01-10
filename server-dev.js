import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// In-memory storage
let goals = [];

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to get week number
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// Get current week's goals
app.get('/api/goals/current', (req, res) => {
  try {
    const now = new Date();
    const currentWeek = getWeekNumber(now);
    const currentYear = now.getFullYear();

    const currentGoals = goals.filter(g => 
      g.weekNumber === currentWeek && g.year === currentYear
    ).sort((a, b) => a.createdAt - b.createdAt);

    res.json(currentGoals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new goal
app.post('/api/goals', (req, res) => {
  try {
    const now = new Date();
    const currentWeek = getWeekNumber(now);
    const currentYear = now.getFullYear();

    const currentGoals = goals.filter(g => 
      g.weekNumber === currentWeek && g.year === currentYear
    );

    if (currentGoals.length >= 5) {
      return res.status(400).json({ message: 'Maximum 5 goals allowed per week' });
    }

    const newGoal = {
      _id: Date.now().toString(),
      text: req.body.text,
      completed: false,
      weekNumber: currentWeek,
      year: currentYear,
      createdAt: new Date()
    };

    goals.push(newGoal);
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Toggle goal completion
app.patch('/api/goals/:id', (req, res) => {
  try {
    const goalIndex = goals.findIndex(g => g._id === req.params.id);
    if (goalIndex === -1) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    goals[goalIndex].completed = !goals[goalIndex].completed;
    res.json(goals[goalIndex]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Development server running on port ${PORT}`);
});
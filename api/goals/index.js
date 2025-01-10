import dbConnect from '../db.js';
import Goal from '../Goal.js';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const now = new Date();
        const currentWeek = getWeekNumber(now);
        const currentYear = now.getFullYear();

        const goals = await Goal.find({
          weekNumber: currentWeek,
          year: currentYear
        }).sort({ createdAt: 1 });

        res.status(200).json(goals);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    case 'POST':
      try {
        const now = new Date();
        const currentWeek = getWeekNumber(now);
        const currentYear = now.getFullYear();

        const goalsCount = await Goal.countDocuments({
          weekNumber: currentWeek,
          year: currentYear
        });

        if (goalsCount >= 5) {
          return res.status(400).json({ message: 'Maximum 5 goals allowed per week' });
        }

        const goal = await Goal.create({
          text: req.body.text,
          weekNumber: currentWeek,
          year: currentYear
        });

        res.status(201).json(goal);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}
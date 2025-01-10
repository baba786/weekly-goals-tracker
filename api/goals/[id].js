import dbConnect from '../db.js';
import Goal from '../Goal.js';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'PATCH':
      try {
        const goal = await Goal.findById(id);
        if (!goal) {
          return res.status(404).json({ message: 'Goal not found' });
        }

        goal.completed = !goal.completed;
        const updatedGoal = await goal.save();
        
        res.json(updatedGoal);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
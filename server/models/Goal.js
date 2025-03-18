import { goalStore } from '../storage/fileStore.js';

class Goal {
  static async findById(id) {
    return await goalStore.findById(id);
  }

  static async find(query) {
    return await goalStore.find(query);
  }

  static async countDocuments(query) {
    return await goalStore.count(query);
  }

  // Create a new goal
  static async create(goalData) {
    // Validate goal data
    if (!goalData.text) {
      throw new Error('Goal text is required');
    }

    if (!goalData.user) {
      throw new Error('User ID is required');
    }

    if (!goalData.weekNumber || !goalData.year) {
      throw new Error('Week number and year are required');
    }

    // Create new goal
    return await goalStore.create({
      ...goalData,
      completed: false,
      createdAt: new Date().toISOString()
    });
  }

  // Save changes to an existing goal
  static async findByIdAndUpdate(id, updates) {
    const goal = await goalStore.findById(id);
    if (!goal) throw new Error('Goal not found');

    // Update and save
    return await goalStore.update(id, updates);
  }
}

export default Goal;
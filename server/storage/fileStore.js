import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORAGE_DIR = path.join(__dirname, 'data');

// Create storage directory if it doesn't exist
const initStorage = async () => {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
    
    // Create user and goal directories
    await fs.mkdir(path.join(STORAGE_DIR, 'users'), { recursive: true });
    await fs.mkdir(path.join(STORAGE_DIR, 'goals'), { recursive: true });
    
    console.log('Storage initialized');
  } catch (error) {
    console.error('Error initializing storage:', error);
    throw error;
  }
};

/**
 * Generate a UUID for new records
 */
const generateId = () => {
  return crypto.randomUUID();
};

/**
 * User operations
 */
const userStore = {
  // Get user file path
  _getUserPath: (userId) => path.join(STORAGE_DIR, 'users', `${userId}.json`),
  
  // Get user by email (for authentication)
  async findByEmail(email) {
    try {
      // List all user files
      const files = await fs.readdir(path.join(STORAGE_DIR, 'users'));
      
      // Check each file to find user with matching email
      for (const file of files) {
        const userData = JSON.parse(
          await fs.readFile(path.join(STORAGE_DIR, 'users', file), 'utf8')
        );
        
        if (userData.email === email) {
          return userData;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  },
  
  // Get user by ID
  async findById(id) {
    try {
      const filePath = this._getUserPath(id);
      const userData = JSON.parse(await fs.readFile(filePath, 'utf8'));
      return userData;
    } catch (error) {
      console.error(`Error finding user ${id}:`, error);
      return null;
    }
  },
  
  // Create new user
  async create(userData) {
    try {
      // Check if user with email already exists
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }
      
      // Generate ID if not provided
      const user = {
        ...userData,
        _id: userData._id || generateId(),
        createdAt: userData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Write user data to file
      const filePath = this._getUserPath(user._id);
      await fs.writeFile(filePath, JSON.stringify(user, null, 2));
      
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  // Update user
  async update(id, updates) {
    try {
      const user = await this.findById(id);
      if (!user) throw new Error('User not found');
      
      const updatedUser = {
        ...user,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      const filePath = this._getUserPath(id);
      await fs.writeFile(filePath, JSON.stringify(updatedUser, null, 2));
      
      return updatedUser;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }
};

/**
 * Goal operations
 */
const goalStore = {
  // Get goal file path
  _getGoalPath: (goalId) => path.join(STORAGE_DIR, 'goals', `${goalId}.json`),
  
  // Get goal by ID
  async findById(id) {
    try {
      const filePath = this._getGoalPath(id);
      const goalData = JSON.parse(await fs.readFile(filePath, 'utf8'));
      return goalData;
    } catch (error) {
      console.error(`Error finding goal ${id}:`, error);
      return null;
    }
  },
  
  // Find goals with query
  async find(query = {}) {
    try {
      const files = await fs.readdir(path.join(STORAGE_DIR, 'goals'));
      
      // Read all goal files
      const goals = await Promise.all(
        files.map(async (file) => {
          return JSON.parse(
            await fs.readFile(path.join(STORAGE_DIR, 'goals', file), 'utf8')
          );
        })
      );
      
      // Filter goals by query criteria
      return goals.filter(goal => {
        // Match all query criteria
        return Object.entries(query).every(([key, value]) => {
          return goal[key] === value;
        });
      });
      
    } catch (error) {
      console.error('Error finding goals:', error);
      return [];
    }
  },
  
  // Count goals matching query
  async count(query = {}) {
    const goals = await this.find(query);
    return goals.length;
  },
  
  // Create new goal
  async create(goalData) {
    try {
      const goal = {
        ...goalData,
        _id: goalData._id || generateId(),
        createdAt: goalData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const filePath = this._getGoalPath(goal._id);
      await fs.writeFile(filePath, JSON.stringify(goal, null, 2));
      
      return goal;
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  },
  
  // Update goal
  async update(id, updates) {
    try {
      const goal = await this.findById(id);
      if (!goal) throw new Error('Goal not found');
      
      const updatedGoal = {
        ...goal,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      const filePath = this._getGoalPath(id);
      await fs.writeFile(filePath, JSON.stringify(updatedGoal, null, 2));
      
      return updatedGoal;
    } catch (error) {
      console.error(`Error updating goal ${id}:`, error);
      throw error;
    }
  },
  
  // Delete goal
  async delete(id) {
    try {
      const filePath = this._getGoalPath(id);
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      console.error(`Error deleting goal ${id}:`, error);
      return false;
    }
  }
};

export {
  initStorage,
  userStore,
  goalStore
};
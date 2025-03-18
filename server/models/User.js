import { userStore } from '../storage/fileStore.js';
import * as passwordUtil from '../storage/passwordUtil.js';

class User {
  static async findById(id) {
    return await userStore.findById(id);
  }
  
  static async findOne(query) {
    // For now we only support finding by email
    if (query.email) {
      return await userStore.findByEmail(query.email);
    }
    return null;
  }
  
  static async create(userData) {
    // Validate user data
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('Missing required fields');
    }
    
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email format');
    }
    
    // Check if password meets requirements
    if (userData.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    
    // Generate salt and hash password
    const salt = passwordUtil.genSalt();
    const hashedPassword = passwordUtil.hash(userData.password, salt);
    
    // Create user with hashed password
    const user = await userStore.create({
      ...userData,
      password: hashedPassword
    });
    
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  // Instance method to match password
  static async matchPassword(user, enteredPassword) {
    return passwordUtil.compare(enteredPassword, user.password);
  }
}

export default User;
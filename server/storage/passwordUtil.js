import crypto from 'crypto';

/**
 * A simple password hashing implementation that doesn't require external dependencies
 * NOTE: This is a simplified version for demonstration - for production use a proper library like bcrypt
 */

// Generate a salt
const genSalt = (rounds = 10) => {
  // Generate random bytes for salt
  const salt = crypto.randomBytes(rounds).toString('hex');
  return salt;
};

// Hash password with given salt
const hash = (password, salt) => {
  // Create HMAC hash with salt
  const hmac = crypto.createHmac('sha256', salt);
  hmac.update(password);
  const hashedPassword = hmac.digest('hex');
  
  // Store with salt so we can verify later
  return `${salt}:${hashedPassword}`;
};

// Compare password with hash
const compare = (password, storedHash) => {
  // Handle case where storedHash doesn't contain a colon
  if (!storedHash || !storedHash.includes(':')) {
    console.warn('Invalid password hash format - missing salt separator');
    return false;
  }
  
  // Extract salt from stored hash
  const [salt, originalHash] = storedHash.split(':');
  
  // Hash the input password with the same salt
  const hmac = crypto.createHmac('sha256', salt);
  hmac.update(password);
  const hashedPassword = hmac.digest('hex');
  
  // Debug info
  console.log('Password comparison:');
  console.log('Input hash:', hashedPassword);
  console.log('Stored hash:', originalHash);
  
  // Compare hashes
  return originalHash === hashedPassword;
};

export { genSalt, hash, compare };
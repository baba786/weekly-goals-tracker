import crypto from 'crypto';

// Generate a predictable salt for testing
const salt = '123456789012';

// Create HMAC hash with the salt
const hmac = crypto.createHmac('sha256', salt);
hmac.update('password123');
const hashedPassword = hmac.digest('hex');

// Output the hash in the format we expect
console.log(`${salt}:${hashedPassword}`);
import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to run a command
const runCommand = (command, args, options = {}) => {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
    ...options
  });

  return new Promise((resolve, reject) => {
    child.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Command failed with code ${code}`));
        return;
      }
      resolve();
    });
  });
};

// Run the backend server
const startBackend = () => {
  console.log('Starting backend server...');
  return runCommand('node', ['server.js'], { cwd: __dirname });
};

// Run the frontend dev server
const startFrontend = () => {
  console.log('Starting frontend dev server...');
  return runCommand('npx', ['vite'], { cwd: __dirname });
};

// Run both servers in parallel
Promise.all([
  startBackend().catch(err => console.error('Backend error:', err)),
  startFrontend().catch(err => console.error('Frontend error:', err))
])
  .then(() => console.log('All processes started successfully'))
  .catch(err => console.error('Error starting servers:', err));
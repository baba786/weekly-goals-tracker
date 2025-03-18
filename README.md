# Weekly Goals Tracker

A minimal and elegant goals tracking application inspired by Things app design principles. Set and track up to 5 key goals for your week with a beautiful, distraction-free interface.

## Features

- ✨ Clean, minimal interface inspired by Things app
- 🎯 Set up to 5 weekly goals
- 🌟 Beautiful animations and transitions
- 💾 Persistent storage using file-based JSON storage (no database required)
- 🔐 Secure user authentication with JWT
- ⌨️ Keyboard shortcuts for quick goal management
- 📱 Fully responsive design
- 🎉 Celebration animations on goal completion

## Demo

Visit the live application: [Mindful Goals Tracker](https://mindful-goals-tracker.vercel.app)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/baba786/weekly-goals-tracker.git

# Navigate to the project directory
cd weekly-goals-tracker

# Install dependencies
npm install

# Create .env file and add required environment variables
JWT_SECRET=your_jwt_secret_here
PORT=3000
VITE_API_URL=/api

# Start the development server
npm run dev
```

## Project Structure

```
weekly-goals-tracker/
├── public/
├── src/
│   ├── components/
│   │   └── ThingsStyleApp.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── routes/
│   ├── models/
│   └── storage/
│       ├── fileStore.js
│       ├── passwordUtil.js
│       └── data/
│           ├── users/
│           └── goals/
├── package.json
└── README.md
```

## Tech Stack

- React
- Vite
- Tailwind CSS
- Express
- Node.js
- File-based JSON Storage

## Storage Architecture

This application uses a file-based storage system instead of a traditional database. This approach has several benefits:

1. **Simplicity**: No database setup or configuration required
2. **Portability**: Easy to move between environments
3. **Transparency**: Data is stored in plain JSON files
4. **No Dependencies**: No external database services needed

### How It Works

- User data is stored in JSON files in `server/storage/data/users/`
- Goal data is stored in JSON files in `server/storage/data/goals/`
- Each record has a unique ID and is stored in its own file
- Authentication still uses JWT tokens for security
- API routes remain consistent with previous database-backed implementation

### Scalability Considerations

While file-based storage is simpler, there are some scalability aspects to consider:

1. **Volume**: For applications with thousands of users, consider implementing pagination or archiving
2. **Concurrency**: File locks can be implemented to prevent conflicts during writes
3. **Backups**: Regularly back up the `storage/data` directory
4. **Search**: For advanced search capabilities, consider adding indexing

## Contributing

Feel free to open issues and pull requests!

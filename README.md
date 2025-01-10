# Weekly Goals Tracker

A minimal and elegant goals tracking application inspired by Things app design principles. Set and track up to 5 key goals for your week with a beautiful, distraction-free interface.

## Features

- ✨ Clean, minimal interface inspired by Things app
- 🎯 Set up to 5 weekly goals
- 🌟 Beautiful animations and transitions
- 💾 Persistent storage using MongoDB
- 🔐 Secure user authentication
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
MONGODB_URI=your_mongodb_uri_here
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
│   └── models/
├── package.json
└── README.md
```

## Tech Stack

- React
- Vite
- Tailwind CSS
- MongoDB
- Express
- Node.js

## Contributing

Feel free to open issues and pull requests!

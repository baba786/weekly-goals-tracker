# Weekly Goals Tracker

A minimal and elegant goals tracking application inspired by Things app design principles. Set and track up to 5 key goals for your week with a beautiful, distraction-free interface.

![Weekly Goals Tracker](public/preview.png)

## Features

- ✨ Clean, minimal interface inspired by Things app
- 🎯 Set up to 5 weekly goals
- 🌟 Beautiful animations and transitions
- 💾 Persistent storage using localStorage
- ⌨️ Keyboard shortcuts for quick goal management
- 📱 Fully responsive design

## Quick Start

```bash
# Clone the repository
git clone https://github.com/baba786/weekly-goals-tracker.git

# Navigate to the project directory
cd weekly-goals-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Required Dependencies

```bash
# Install core dependencies
npm install react react-dom @vitejs/plugin-react

# Install UI dependencies
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind CSS
npx tailwindcss init -p
```

## Tailwind Configuration

Add this to your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update your `src/index.css` or `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Usage

### Keyboard Shortcuts
- `Enter` - Add a new goal when in input mode
- `Escape` - Cancel adding a new goal
- `Click` - Toggle goal completion
- `Hover` - Reveal additional actions

### Goal Management
- Maximum of 5 goals per week
- Click the checkbox to mark goals as complete
- Goals persist between sessions
- Reset goals at any time for a new week

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
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## Development

### Prerequisites
- Node.js 16.x or later
- npm 7.x or later

### Local Development

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:5173](http://localhost:5173) in your browser

3. Make changes and see them update in real-time

### Building for Production

```bash
# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Design inspired by Things app
- Icons by [Lucide Icons](https://lucide.dev/)
- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
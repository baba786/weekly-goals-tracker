import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ThingsStyleApp from './components/ThingsStyleApp';

function App() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return <HomePage onEnterApp={() => setShowApp(true)} />;
  }

  return <ThingsStyleApp onBack={() => setShowApp(false)} />;
}

export default App;
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const celebrationMessages = [
  "Amazing work! 🌟",
  "You're crushing it! 💪",
  "Way to go! 🎯",
  "Progress feels good! ✨",
  "Keep shining! 🌈",
  "You're on fire! 🔥"
];

const Celebration = ({ onComplete }) => {
  const [message] = useState(() => 
    celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)]
  );

  useEffect(() => {
    // Trigger confetti
    const duration = 1500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        onComplete?.();
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg transform animate-celebration">
        <p className="text-2xl font-bold text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default Celebration;
import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const CelebrationEffect = ({ onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create a canvas element for confetti
    const myCanvas = document.createElement('canvas');
    myCanvas.style.position = 'fixed';
    myCanvas.style.inset = '0';
    myCanvas.style.width = '100%';
    myCanvas.style.height = '100%';
    myCanvas.style.pointerEvents = 'none';
    myCanvas.style.zIndex = '9999';
    document.body.appendChild(myCanvas);

    // Create confetti instance
    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true
    });

    // Enhanced confetti settings
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 45,
      spread: 180,
      ticks: 100,
      zIndex: 10000,
      scalar: 1.2,
      gravity: 1.2,
      drift: 0,
      shapes: ['circle', 'square'],
      colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
    };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        document.body.removeChild(myCanvas);
        onComplete?.();
        return;
      }

      const particleCount = 70 * (timeLeft / duration);

      // Left side confetti
      myConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });

      // Right side confetti
      myConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });

      // Center burst occasionally
      if (Math.random() > 0.8) {
        myConfetti({
          ...defaults,
          particleCount: particleCount * 1.5,
          origin: { x: 0.5, y: 0.5 }
        });
      }
    }, 200);

    return () => {
      clearInterval(interval);
      if (myCanvas && myCanvas.parentNode) {
        myCanvas.parentNode.removeChild(myCanvas);
      }
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-[1000]">
      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg animate-celebration">
        <p className="text-xl font-bold text-gray-800">
          🎉 Goal achieved!
        </p>
      </div>
    </div>
  );
};

export default CelebrationEffect;
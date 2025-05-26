import React, { useState } from 'react';
import { Timer } from './components/Timer';
import { Controls } from './components/Controls';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme'; // ✅ theme support

const DEFAULT_DURATION = 1 * 60; // for testing, 1 minute

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [resetSignal, setResetSignal] = useState(0); // ✅ add resetSignal
  useTheme();

  const handleComplete = () => {
    new Audio('/sound/beep.mp3').play();
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setDuration(DEFAULT_DURATION);
    setResetSignal(prev => prev + 1); // ✅ update signal to trigger Timer reset
  };

  return (
    <div className="w-[320px] p-5 bg-white dark:bg-primary rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 transition-all">
      {/* Header */}
      <div className="relative mb-4">
        <img
          src="/assets/logo.png"
          alt="Pomonest Logo"
          className="w-14 h-14 mx-auto mb-1"
        />
        <h1 className="text-center text-xl font-bold text-gray-800 dark:text-white tracking-tight">
          Pomonest
        </h1>
        <ThemeToggle />
      </div>

      {/* Subtitle */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        Pomodoro Timer Extension
      </p>

      {/* Timer Display */}
      <Timer
        duration={duration}
        isRunning={isRunning}
        onComplete={handleComplete}
        resetSignal={resetSignal} // ✅ pass prop
      />

      {/* Controls */}
      <Controls
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onReset={handleReset}
      />
    </div>
  );
};

export default App;

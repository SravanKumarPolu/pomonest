import { useState, useEffect } from "react";

const Pomodoro = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-4xl font-mono">{formatTime(seconds)}</h1>
      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(25 * 60);
          }}
          className="bg-gray-600 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;

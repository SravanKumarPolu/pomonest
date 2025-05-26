import { useEffect, useRef, useState } from "react";

interface TimerProps {
  duration: number;
  isRunning: boolean;
  onComplete: () => void;
  resetSignal: number;
}

export const Timer: React.FC<TimerProps> = ({ duration, isRunning, onComplete, resetSignal }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);
  const beepAudioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    tickAudioRef.current = new Audio('/sound/tick.mp3');
    tickAudioRef.current.volume = 0.6;
    tickAudioRef.current.loop = true;

    beepAudioRef.current = new Audio('/sound/beep.mp3');
    beepAudioRef.current.volume = 0.8;
  }, []);

  useEffect(() => {
    if (!isRunning && tickAudioRef.current && !tickAudioRef.current.paused) {
      tickAudioRef.current.pause();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isRunning && secondsLeft > 0) {
      if (tickAudioRef.current && tickAudioRef.current.paused) {
        tickAudioRef.current.currentTime = 0;
        tickAudioRef.current.play().catch(() => {});
      }

      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          const next = prev - 1;

          if (next <= 0) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            if (tickAudioRef.current) tickAudioRef.current.pause();
            if (beepAudioRef.current) {
              beepAudioRef.current.currentTime = 0;
              beepAudioRef.current.play().catch(() => {});
            }
            onComplete();
            return 0;
          }

          return next;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, secondsLeft, onComplete]);

  // 🔁 Reset when resetSignal changes
  useEffect(() => {
    setSecondsLeft(duration);
    if (tickAudioRef.current) {
      tickAudioRef.current.pause();
      tickAudioRef.current.currentTime = 0;
    }
    if (beepAudioRef.current) {
      beepAudioRef.current.pause();
      beepAudioRef.current.currentTime = 0;
    }
  }, [resetSignal]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progress = 100 - (secondsLeft / duration) * 100;

  return (
    <div className="mb-4 bg-white dark:bg-primary transition-colors duration-300 p-4 rounded-xl">
      <div className="text-4xl font-mono font-bold text-center text-gray-900 dark:text-white mb-2">
        {formatTime(secondsLeft)}
      </div>
      <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded">
        <div
          className="h-full bg-red-500 rounded transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;

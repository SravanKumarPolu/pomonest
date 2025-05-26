import { useEffect, useRef, useState } from 'react';

export const useTimer = (initialMinutes: number) => {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            playSound(); // Trigger alert
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current!);
  }, [isRunning]);

  const playSound = () => {
    const audio = new Audio('/sound/beep.mp3');
    audio.play();
  };

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(initialMinutes * 60);
  };

  return { secondsLeft, isRunning, setIsRunning, reset };
};

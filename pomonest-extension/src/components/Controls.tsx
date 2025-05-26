interface ControlsProps {
    isRunning: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
  }
  
  export const Controls: React.FC<ControlsProps> = ({ isRunning, onStart, onPause, onReset }) => {
    return (
      <div className="flex justify-center gap-4 mt-4">
        {isRunning ? (
          <button
            onClick={onPause}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Pause
          </button>
        ) : (
          <button
            onClick={onStart}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Start
          </button>
        )}
        <button
          onClick={onReset}
          className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600">
          Reset
        </button>
      </div>
    );
  };
  
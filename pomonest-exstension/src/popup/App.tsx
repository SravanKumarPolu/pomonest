import Pomodoro from "../shared/Pomodoro";


const App = () => {
  return (
    <div className="w-[300px] h-[320px] p-4 rounded shadow bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
        Pomonest
      </h2>
      <Pomodoro />
    </div>
  );
};

export default App;

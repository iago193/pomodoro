import { PomodoroTime } from "./components/pomodoro-time";

function App() {
  return (
    <>
      <PomodoroTime
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    </>
  );
}

export default App;

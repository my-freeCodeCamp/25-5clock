import { useState, useEffect } from "react";
import AlarmSound from "./assets/AlarmSound.mp3";
import "./App.css";
import TimeSetter from "./components/TimeSetter";
import Display from "./components/Display";

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const minTime = 1 * 60;
const maxTime = 60 * 60;
const interval = 60;

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState({
    time: sessionTime,
    timeType: "Session",
    timerRunning: false,
  });

  useEffect(() => {
    let timerID;
    if (!displayState.timerRunning) return;

    timerID = window.setInterval(decrementDisplay, 1000);

    return () => {
      window.clearInterval(timerID);
    };
  }, [displayState.timerRunning]);

  useEffect(() => {
    if (displayState.time === 0) {
      const audio = document.getElementById("beep");
      audio.currentTime = 2;
      audio.play().catch((err) => console.log(err));
      setDisplayState((prev) => ({
        ...prev,
        timeType: prev.timeType === "Session" ? "Break" : "Session",
        time: prev.timeType === "Session" ? breakTime : sessionTime,
      }));
    }
  }, [displayState, breakTime, sessionTime]);

  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false,
    });
    
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };
  

  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning,
    }));
  };

  const changeBreakTime = (newTime) => {
    if (displayState.timerRunning) return;
    if (newTime >= minTime && newTime <= maxTime) {
      setBreakTime(newTime);
    }
  };

  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }));
  };

  const changeSessionTime = (newTime) => {
    if (displayState.timerRunning) return;
    if (newTime >= minTime && newTime <= maxTime) {
      setSessionTime(newTime);
      setDisplayState({
        time: newTime,
        timeType: "Session",
        timerRunning: false,
      });
    }
  };

  return (
    <div className="clock">
      <div className="setters">
        <div className="break">
          <h4 id="break-label">Break Length</h4>
          <TimeSetter
            time={breakTime}
            setTime={changeBreakTime}
            min={minTime}
            max={maxTime}
            interval={interval}
            type="break"
          />
        </div>
        <div className="session">
          <h4 id="session-label">Session Length</h4>
          <TimeSetter
            time={sessionTime}
            setTime={changeSessionTime}
            min={minTime}
            max={maxTime}
            interval={interval}
            type="session"
          />
        </div>
      </div>
      <Display
        displayState={displayState}
        reset={reset}
        startStop={startStop}
      />
      <audio id="beep" src={AlarmSound} />
      <audio id="beep" src="https://www.soundjay.com/button/beep-07.wav" preload="auto"></audio>
    </div>
  );
}

export default App;

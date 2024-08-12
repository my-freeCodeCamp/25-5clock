import { formatTime } from "../helpers";
import { FaPlay, FaPause, FaUndo } from "react-icons/fa";

const Display = ({ displayState, reset, startStop }) => {
  return (
    <div className="display">
      <h4 id="timer-label">{displayState.timeType}</h4>
      <span
        id="time-left"
        style={{ color: `${displayState.timerRunning ? "red" : "white"}` }}
      >
        {formatTime(displayState.time)}
      </span>
      <div>
        <button id="start_stop" onClick={startStop}>
          {displayState.timerRunning ? <FaPause /> : <FaPlay />}
        </button>
        <button id="reset" onClick={reset}>
          <FaUndo />
        </button>
      </div>
    </div>
  );
};

export default Display;

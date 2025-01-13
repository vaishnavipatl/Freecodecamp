import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown,faPlay, faStop, faUndo } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [breakLength, setBreakLength] = useState(5); // Break time in minutes
  const [sessionLength, setSessionLength] = useState(25); // Session time in minutes
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60); // Time in seconds
  const [isRunning, setIsRunning] = useState(false); // Timer running state
  const [currentMode, setCurrentMode] = useState("Session"); // "Session" or "Break"
  const audioRef = useRef(null); // Audio reference for beep sound

  // Update timeLeft when session or break length changes
  useEffect(() => {
    if (currentMode === "Session") {
      setTimeLeft(sessionLength * 60); // Set time to session length in seconds
    } else {
      setTimeLeft(breakLength * 60); // Set time to break length in seconds
    }
  }, [sessionLength, breakLength, currentMode]);

  // Timer countdown effect
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            audioRef.current.currentTime = 0; // Reset beep sound to the start
            audioRef.current.play().catch((error) => {
              console.error("Failed to play the sound:", error);
            });

            // Change mode when time reaches 0
            if (currentMode === "Session") {
              setCurrentMode("Break");
              setTimeLeft(breakLength * 60); // Start break countdown
            } else {
              setCurrentMode("Session");
              setTimeLeft(sessionLength * 60); // Start session countdown
            }
            return 0; // Prevent negative time values
          }

          return prev - 1; // Decrease time by 1 second
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isRunning, currentMode, breakLength, sessionLength]);

  // Format time as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Increment/Decrement functions
  const handleIncrement = (setter, value) => {
    if (value < 60) setter(value + 1);
  };

  const handleDecrement = (setter, value) => {
    if (value > 1) setter(value - 1);
  };

  // Reset function
  const handleReset = () => {
    setIsRunning(false); 
    setBreakLength(5); 
    setSessionLength(25); 
    setTimeLeft(25 * 60); 
    setCurrentMode("Session"); 
    audioRef.current.pause(); 
    audioRef.current.currentTime = 0;
  };

  return (
    <div id="pomodoro-timer">
        <h1 id='main-head'>25+5 CLOCK</h1>
          <div id="label">
             <h1>Break</h1>
             <h1>Session</h1>
          </div>
          
          <div id="break-sessionbuttons">
            <div id="breakbutton">
              <div id="break-increment" onClick={() => handleIncrement(setBreakLength, breakLength)}>
                  <FontAwesomeIcon icon={faArrowUp}/>
              </div>
             

              <span id="break-length">{breakLength}</span>


              <div id="break-decrement" onClick={() => handleDecrement(setBreakLength, breakLength)}>
                  <FontAwesomeIcon icon={faArrowDown}/>
              </div>
            </div>


            <div id="seesionbutton">
              <div id="session-increment" onClick={() => handleIncrement(setSessionLength, sessionLength)}>
                  <FontAwesomeIcon icon={faArrowUp} />
              </div>

               <span id="session-length">{sessionLength}</span>
              
              <div id="session-decrement"onClick={() => handleDecrement(setSessionLength, sessionLength)}>
                  <FontAwesomeIcon icon={faArrowDown}/>
              </div>
            </div>
          
          </div>
          
             
      <div id="timer-display">
        <h2>{currentMode}</h2>
        <span>{formatTime(timeLeft)}</span> 
      </div>
        
      <div>
        <button id="start_stop" onClick={() => setIsRunning(!isRunning)}>
        <FontAwesomeIcon icon={isRunning ? faStop : faPlay} />
        
        </button>
        <button id="reset" onClick={handleReset}>
        <FontAwesomeIcon icon={faUndo}/>
        </button>
      </div>
       
      <audio id="beep" ref={audioRef} src="/beep-warning-6387.mp3" /> 
    </div>
  );
};

export default App;

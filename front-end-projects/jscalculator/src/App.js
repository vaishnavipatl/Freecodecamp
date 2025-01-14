import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [evaluated, setEvaluated] = useState(false); // Track if the last action was "="

  const handleDigits = (event) => {
    const number = event.target.textContent;

    if (evaluated) {
      setDisplay(number);
      setEvaluated(false);
    } else if (display === "0") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };
  const handleOperator = (event) => {
    const operator = event.target.textContent;
    const trimmedDisplay = display.trim();
    
    if (evaluated) {
      // Start new calculation with the result
      setDisplay(trimmedDisplay + " " + operator + " ");
      setEvaluated(false);
    } else if (/[+\-*/]$/.test(trimmedDisplay)) {
      if (operator === "-" && /[+\-*/]$/.test(trimmedDisplay)) {
        // Allow a negative sign after another operator
        setDisplay(trimmedDisplay + operator);
      } else if (operator !== "-") {
        // Replace the last operator with the new one if it's not a negative sign
        setDisplay(trimmedDisplay.slice(0, -2) + " " + operator + " ");
      }
      // If the operator is a negative sign, we don't change the display
      // because we already handled it above
    } else {
      setDisplay(trimmedDisplay + " " + operator + " ");
    }
  };
  

  const handleEqual = () => {
    try {
      const sanitizedDisplay = display.replace(/([+\-*/])\s*$/, ""); // Remove trailing operators
      const result = Function(`'use strict'; return (${sanitizedDisplay})`)();
      setDisplay(result.toString());
      setEvaluated(true);
    } catch (error) {
      setDisplay("Error");
    }
  };
  

  const handleDecimal = () => {
    const parts = display.split(/[\s]+/);
    const lastElement = parts[parts.length - 1];

    if (!lastElement.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEvaluated(false);
  };

  return (
    <div className="App">
     <div className="app1">
      <div className="Calculator">
        <div id="display" className="row">{display}</div>
        <div id="clear" onClick={handleClear}>AC</div>
        <div id="delete" onClick={handleClear}>Del</div>
        <div id="Module">%</div>
        <div id="divide" onClick={handleOperator}>/</div>
        <div id="seven" onClick={handleDigits}>7</div>
        <div id="eight" onClick={handleDigits}>8</div>
        <div id="nine" onClick={handleDigits}>9</div>
        <div id="multiply" onClick={handleOperator}>*</div>
        <div id="four" onClick={handleDigits}>4</div>
        <div id="five" onClick={handleDigits}>5</div>
        <div id="six" onClick={handleDigits}>6</div>
        <div id="add" onClick={handleOperator}>+</div>
        <div id="one" onClick={handleDigits}>1</div>
        <div id="two" onClick={handleDigits}>2</div>
        <div id="three" onClick={handleDigits}>3</div>
        <div id="subtract" onClick={handleOperator}>-</div>
        <div id="zero" onClick={handleDigits}>0</div>
        <div id="zero" onClick={handleDigits}>00</div>
        <div id="decimal" onClick={handleDecimal}>.</div>
        <div id="equals" onClick={handleEqual}>=</div>
        
      </div>
      </div> 
    </div>
  );
}

export default App;

import { useState } from "react";
import React from "react";

function App() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter((prevCounter) => ++prevCounter);
  };

  const decrement = () => {
    setCounter((prevCounter) => --prevCounter);
  };

  return (
    <div>
      <h2 data-testid="counter">{counter}</h2>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

function Input(props) {
  const { handleChange, inputValue } = props;
  return <input onChange={handleChange} value={inputValue} />;
}

function AppTwo() {
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <Input handleChange={handleChange} inputValue={inputValue} />
    </div>
  );
}

export { App, AppTwo, Input };
import { useState } from 'react';

export default function Clock(props) {
  const [color, setColor] = useState(props.color);
  typeof setColor; // Clear linter error.
  return (
    <h1 style={{ color: color }}>
      {props.time}
    </h1>
  );
}

export function ClockUpdated(props) {
  return (
    <h1 style={{ color: props.color }}>
      {props.time}
    </h1>
  );
}

// // Or, using the destructuring syntax:
export function UpdatedClock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}
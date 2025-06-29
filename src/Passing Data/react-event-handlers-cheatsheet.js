/**
 * React Event Handler Patterns Reference
 * --------------------------------------
 * Covers:
 * - Inline functions
 * - Memoized callbacks
 * - Curried function handlers
 * - Argument passing in event handlers
 */

import React, { useCallback } from "react";

// 🔘 Reusable Button Component (Self-contained)
function Button({ text = "Click Me!", color = "blue", fontSize = 12, handleClick }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + "px",
    margin: "8px",
    padding: "6px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (<button onClick={handleClick} style={buttonStyle}>{text}</button>);
}

// Dummy data
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// ✅ 1. Curried Functions
// Use when:
// You need to preload data (e.g., user ID, URL, index).
// You're working with lists, map(), or dynamically generating handlers.
// You want cleaner code by separating handler logic from rendering.
const handleUserClick = (userId) => () => {
  console.log(`User clicked: ${userId}`);
};

function CurriedExample() {
  return (
    <>
      <h3>Curried Function Example</h3>
      {users.map(user => (
        <Button
          key={user.id}
          text={`User ${user.name}`}
          handleClick={handleUserClick(user.id)}
        />
      ))}
    </>
  );
}

// ✅ 2. Inline Arrow Function
// Use when:
// You need to pass arguments quickly and simply.
// You’re not worried about the function being re-created on every render.
// You want a fast, direct solution without abstraction.
function InlineExample() {
  function doSomething(data) {
    console.log(`Do stuff with: ${data}`);
  }

  return (
    <>
      <h3>Inline Arrow Function Example</h3>
      <Button text="Run Inline" handleClick={() => doSomething("Some data")} />
    </>
  );
}

// ✅ 3. Memoized Callback (useCallback)
// Use when:
// You’re passing the handler to a memoized child component (React.memo, useMemo, etc.).
// You want to prevent re-renders caused by function identity changes.
// Your handler is stable (not dependent on changing variables unless they're in the dep array).
function CallbackExample() {
  const handleClick = useCallback(() => {
    console.log("Stable memoized handler");
  }, []);

  return (
    <>
      <h3>Memoized Callback Example</h3>
      <Button text="Click Me (Stable)" handleClick={handleClick} />
    </>
  );
}

// 👇 Exporting a demo root to showcase all examples
export default function ReactEventHandlersCheatsheet() {
  return (
    <div>
      <CurriedExample />
      <InlineExample />
      <CallbackExample />
    </div>
  );
}

// 🛠 Also exporting individual examples if needed elsewhere
export {
  Button,
  CurriedExample,
  InlineExample,
  CallbackExample,
  handleUserClick,
};
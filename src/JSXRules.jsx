// Return a single root element.
function App() {
  // Could replace <></> with <div></div>
  return (
    <>
      <h1>Example h1</h1>
      <h2>Example h2</h2>
    </>
  );
}

// Close all tags.
function AppTwo() {
  return (
    <>
      <input />
      <li></li>
    </>
  );
}

// camelCase Most things
function AppThree() {
  return (
  <div className="container">
    <svg>
      <circle cx="25" cy="75" r="20" stroke="green" strokeWidth="2" />
    </svg>
  </div>
  );
}


export { App, AppTwo, AppThree };
import { useState } from "react";

// State is tied to a position in the render tree
function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) className += ' hover';

  return (
    <div className={className} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}

function App() {
    const counter = <Counter />;

    return (
        <div>
            {counter}
            {counter}
        </div>
    );
}

export { App };

// Same component at the same position preserves state
function MyApp() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <MyCounter isFancy={true} /> 
      ) : (
        <MyCounter isFancy={false} /> 
      )}
      <label>
        <input type="checkbox" checked={isFancy} onChange={e => setIsFancy(e.target.checked)} />
        Use fancy styling
      </label>
    </div>
  );
}

function MyCounter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}

export { MyApp };

// Different components at the same position reset state
function TestApp() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div>
      {isPaused ? (<p>See you later!</p> ) : (<TestCounter /> )} {/* Different components here */}
      <label><input type="checkbox" checked={isPaused} onChange={e => {setIsPaused(e.target.checked)}} />Take a break</label>
    </div>
  );
}

function TestCounter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}

export { TestApp };

// when you render a different component in the same position, it resets the state of its entire subtree
function BuggyApp() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (<div><BuggyCounter isFancy={true} /></div>) : (<section><BuggyCounter isFancy={false} /></section>)}
      <label>
        <input type="checkbox" checked={isFancy} onChange={e => {setIsFancy(e.target.checked)}} />
        Use fancy styling
      </label>
    </div>
  );
}

function BuggyCounter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}

export { BuggyApp };

// always declare component functions at the top level, and don’t nest their definitions.


// Reseting state at the same position.
function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (<ScoreCounter person="Taylor" />) : (<ScoreCounter person="Sarah" />)}
      <button onClick={() => {setIsPlayerA(!isPlayerA);}}>Next player!</button>
    </div>
  );
}

function ScoreCounter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) className += ' hover';

  return (
    <div className={className} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
        <h1>{person}'s score: {score}</h1>
        <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}

export { Scoreboard };

// React sees above code as the same counter who's props have changed.

// There are two ways to reset state when switching between them:
// Render components in different positions
// Give each component an explicit identity with key

// Option 1: Rendering a component in different positions
function ScoreboardOne() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA && <CounterOne person="Taylor" />}
      {!isPlayerA && <CounterOne person="Sarah" />}
      <button onClick={() => {setIsPlayerA(!isPlayerA);}}>Next player!</button>
    </div>
  );
}

function CounterOne({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}

export { ScoreboardOne };

// Option 2: Resetting state with a key 
function ScoreboardTwo() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (<CounterTwo key="Taylor" person="Taylor" />) : (<CounterTwo key="Sarah" person="Sarah" />)}
      <button onClick={() => {setIsPlayerA(!isPlayerA);}}>Next player!</button>
    </div>
  );
}

function CounterTwo({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}

export { ScoreboardTwo };

// In above code if I wanted to have each component keep the state of scores
// I'd have to move up state and it would look like

export default function ScoreboardThree() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  const [scores, setScores] = useState({
    Taylor: 0,
    Sarah: 0
  });

  const currentPlayer = isPlayerA ? 'Taylor' : 'Sarah';

  function handleAddOne(player) {
    setScores(prevScores => ({
      ...prevScores,
      [player]: prevScores[player] + 1
    }));
  }

  return (
    <div>
      <CounterThree person={currentPlayer} score={scores[currentPlayer]} onAddOne={() => handleAddOne(currentPlayer)} />
      <button onClick={() => setIsPlayerA(!isPlayerA)}>Next player!</button>
    </div>
  );
}

function CounterThree({ person, score, onAddOne }) {
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) className += ' hover';

  return (
    <div className={className} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <h1>{person}'s score: {score}</h1>
      <button onClick={onAddOne}>Add one</button>
    </div>
  );
}

export { ScoreboardThree }
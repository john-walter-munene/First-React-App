import { useState } from "react";

function App() {
  const [showHint, setShowHint] = useState(false);
  if (showHint) {
    return (
      <div>
        <p><i>Hint: Your favorite city?</i></p>
        <Form />
        <button onClick={() => setShowHint(false)}>Hide hint</button>
      </div>
    );
  }

  return (
    <div>
      <Form />
      <button onClick={() => {
        setShowHint(true);
      }}>Show hint</button>
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (<textarea value={text} onChange={e => setText(e.target.value)} />);
}

export { App };

// Fix Dissappearing input.
export default function UpdatedApp() {
    const [showHint, setShowHint] = useState(false);

    return (
        <div>
            {showHint && <p><i>Hint: Your favorite city?</i></p>}
            <UpdatedForm />
            <button onClick={() => setShowHint(showHint => !showHint)}>
                {showHint ? "Show hint" : "Hide hint"}
            </button>
        </div>
    );
}

function UpdatedForm() {
    const [text, setText] = useState('');
    return (<textarea value={text} onChange={(event) => setText(event.target.value)}></textarea>);
}

export { UpdatedApp };
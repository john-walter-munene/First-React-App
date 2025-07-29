import { useState  } from "react";

// Translating the imperative code in indexjs to declarative.

// Step 1: Identify your component’s different visual states

// Mock UI behavior.
function Form({
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea />
        <br />
        <button>Submit</button>
      </form>
    </>
  )
}

export { Form };

// Fleshed out solution.
function UpdatedForm({
  // Try 'submitting', 'error', 'success':
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea disabled={status === 'submitting'} />
        <br />
        <button disabled={ status === 'empty' || status === 'submitting' }>Submit</button>
        {status === 'error' &&
          <p className="Error">Good guess but a wrong answer. Try again!</p>
        }
      </form>
      </>
  );
}

export { UpdatedForm };

// If a component has a lot of visual states, 
// it can be convenient to show them all on one page:

function NewForm({ status }) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <form>
      <textarea disabled={status === 'submitting' } />
      <br />
      <button disabled={status === 'empty' || status === 'submitting' }>Submit</button>
      {status === 'error' && <p className="Error">Good guess but a wrong answer. Try again!</p>}
    </form>
  );
}

let statuses = ['empty', 'typing', 'submitting', 'success', 'error', ];

export default function App() {
  return (
    <>
      {statuses.map(status => (
        <section key={status}>
          <h4>Form ({status}):</h4>
          <NewForm status={status} />
        </section>
      ))}
    </>
  );
}


// Step 2: Determine what triggers those state changes 
// Human inputs, like clicking a button, typing in a field, navigating a link.
// Computer inputs, like a network response arriving, a timeout completing, an image loading.

// For the above form.
// Changing the text input (human) should switch it from the Empty state to the Typing state or back, depending on whether the text box is empty or not.
// Clicking the Submit button (human) should switch it to the Submitting state.
// Successful network response (computer) should switch it to the Success state.
// Failed network response (computer) should switch it to the Error state with the matching error message.

// Step 3: Represent the state in memory with useState

// Start with the state that must be present.
// const [answer, setAnswer] = useState('');
// const [error, setError] = useState(null);

// If I struggle, add all visual states that all possibilities are covered
// const [isEmpty, setIsEmpty] = useState(true);
// const [isTyping, setIsTyping] = useState(false);
// const [isSubmitting, setIsSubmitting] = useState(false);
// const [isSuccess, setIsSuccess] = useState(false);
// const [isError, setIsError] = useState(false);

// Step 4: Remove any non-essential state variables 
// const [answer, setAnswer] = useState('');
// const [error, setError] = useState(null);
// const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'

// Step 5: Connect the event handlers to set state 
function WorkingForm() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') return (<h1>That's right!</h1>);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>In which city is there a billboard that turns air into drinkable water?</p>
      <form onSubmit={handleSubmit}>
        <textarea value={answer} onChange={handleTextareaChange} disabled={status === 'submitting'} />
        <br />
        <button disabled={answer.length === 0 || status === 'submitting'}>Submit</button>
        {error !== null && <p className="Error">{error.message}</p>}
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}

export { WorkingForm };

// Key takeways for developing components.
// Identify all its visual states.
// Determine the human and computer triggers for state changes.
// Model the state with useState.
// Remove non-essential state to avoid bugs and paradoxes.
// Connect the event handlers to set state.
// Group related state

import { useState } from "react";

function TestComponentOne () {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    console.table(typeof x, typeof y, typeof setX, typeof setY); // Clear console error.

    return null;
}

function TestComponentTwo() {
    const [position, setPosition] = useState({ x: 0, y: 0});

    console.log(typeof position, typeof setPosition) // Clear console error.
}

export { TestComponentOne, TestComponentTwo };

// Example.
function MovingDot() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    return (
        <div onPointerMove={(event) => setPosition({ x: event.target.clientX, y: event.target.clientY})}
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
            }}>
                <div style={{
                    position: "absolute",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    left: -10,
                    top: -10,
                    width: 20,
                    height: 20,
                }}></div>
        </div>
    );
}

export { MovingDot };

// Avoid contradictions in state 
function FeedbackForm() {
    const [text, setText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSending(true);
        await sendMessage(text);
        setIsSending(false);
        setIsSent(true);
    }

    if (isSent) return (<h1>Thanks for feedback!</h1>);

    return (
        <form onSubmit={handleSubmit}>
            <p>How was your stay at Walter's cottage?</p>

            <textarea disabled={isSending} value={text} onChange={(event) => setText(event.target.value)} />
            <br/>

            <button type="submit" disabled={isSending}>Send</button>
        </form>
    );
}

// Pretend to send message.
function sendMessage(text) {
    console.log(text);
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    })
}

export { FeedbackForm };

// Above code works but we always need two states opposing each other.
// Replace with a single state variable.
function UpdatedFeedbackForm() {
    const [text, setText] = useState('');
    const [status, setStatus] = useState('typing');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('sending');
        await sendMessage(text);
        setStatus('sent');
    };

    const isSending = (status === 'sending');
    const isSent = (status === 'sent');

    if (isSent) return ( <h1>Thanks for feedback</h1> );

    return (
        <form onSubmit={handleSubmit} >
            <p>How was your stay at Walter's cottage?</p>
            <textarea disabled={isSending} value={text} onChange={(event) => setText(event.target.value)}></textarea>
            <br />
            <button disabled={isSending} type="submit" >Send</button>
            {isSending && <p>Sending...</p>}
        </form>
    );

}

export { UpdatedFeedbackForm };

// Avoid redundant state
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
    setFullName(firstName + ' ' + e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input value={firstName} onChange={handleFirstNameChange} />
      </label>

      <label>
        Last name:{' '}
        <input value={lastName} onChange={handleLastNameChange} />
      </label>
      <p>Your ticket will be issued to: <b>{fullName}</b></p>
    </>
  );
}

// In above code fullname can be computed from first, and last name.
// Remove it from state.
function UpdatedForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const fullName = `${firstName} ${lastName}`;

    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);

     return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input value={firstName} onChange={handleFirstNameChange} />
      </label>

      <label>
        Last name:{' '}
        <input value={lastName} onChange={handleLastNameChange} />
      </label>
      <p>Your ticket will be issued to: <b>{fullName}</b></p>
    </>
  );
}

export { UpdatedForm };

// Avoid duplication in state.
const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]
  );

  typeof setItems

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.title}{' '}
            <button onClick={() => setSelectedItem(item)}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}

export { Menu };

// In above code, information about the item is dupicated in two places.
// Why is this a problem? Let’s make each item editable:

const initialItemsForEditableMenu = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];
    
function EditableMenu() {
    const [items, setItems] = useState(initialItemsForEditableMenu);
    const [selectedItem, setSelectedItem] = useState(items[0]);

    const handleItemChange = (id, event) => {
        setItems(items.map((item) => {
            if (item.id === id) return {...item, title: event.target.value};
            else return item;
        }))
    }

    return (
    <>
      <h2>What's your travel snack?</h2> 
      <ul>
        {items.map((item, index) => (
          <li key={item.id} >
                <input  value={item.title} onChange={e => handleItemChange(item.id, e)} />
            {' '} {console.log(index)}
            <button onClick={() => setSelectedItem(item)}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}

export { EditableMenu };

// Solution: Remove state duplication.
const bestInitialItems = [...initialItemsForEditableMenu];

function BestMenu() {
    const [items, setItems] = useState(bestInitialItems);
    const [selectedId, setSelectedId] = useState(0);

    const selectedItem = items.find((item) => (item.id = selectedId));

    const handleItemChange = (id, event) => {
        setItems(items.map((item) => {
            if (item.id === id) return {...item, title: event.target.value};
            else return item;
        }));
    }

    return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input value={item.title} onChange={e => handleItemChange(item.id, e)}
              />
                {' '} {console.log(index)}
                <button onClick={() => setSelectedId(item.id)}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}

// Avoid deeply nested state
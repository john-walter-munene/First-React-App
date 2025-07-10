import { useState } from "react";

function Form() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
        setFullName(`${firstName} ${lastName}`);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
        setFullName(`${firstName} ${lastName}`);
    }

     return (
        <>
            <h2>Let’s check you in</h2>
            <label>First name:{' '}<input value={firstName} onChange={handleFirstNameChange} /></label>
            <label>Last name:{' '}<input value={lastName} onChange={handleLastNameChange} /></label>
            <p>Your ticket will be issued to: <b>{fullName}</b></p>
        </>
  );
}

function UpdatedForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const fullName = `${firstName} ${lastName}`;

    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);

    return (
        <>
            <h2>Let’s check you in</h2>
            <label>First name:{' '}<input value={firstName} onChange={handleFirstNameChange} /></label>
            <label>Last name:{' '}<input value={lastName} onChange={handleLastNameChange} /></label>
            <p>Your ticket will be issued to: <b>{fullName}</b></p>
        </>
  );    
}

export { Form, UpdatedForm };

// Don't mirrot props in state.
// If parent component passes a different prop other than expected, state won't be updated.
// state is only initialized during the first render.
function Message({ messageColor }) {
    const [color, setColor] = useState(messageColor);
    typeof color , typeof setColor // clear console error.
}

function MessageApp({ initialColor }) {
  // The `color` state variable holds the *first* value of `initialColor`.
  // Further changes to the `initialColor` prop are ignored.
  const [color, setColor] = useState(initialColor);
  typeof color , typeof setColor // clear console error.
}
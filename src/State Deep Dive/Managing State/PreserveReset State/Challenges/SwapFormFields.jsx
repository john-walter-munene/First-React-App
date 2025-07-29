import { useState } from "react";

function App() {
  const [reverse, setReverse] = useState(false);

  let checkbox = (
    <label>
      <input type="checkbox" checked={reverse} onChange={e => setReverse(e.target.checked)} />
      Reverse order
    </label>
  );

  if (reverse) {
    return (
      <>
        <Field key={'lastName'} label="Last name" /> 
        <Field key={'firstName'} label="First name" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field key={'firstName'} label="First name" /> 
        <Field key={'lastName'} label="Last name" />
        {checkbox}
      </>
    );    
  }
}

function Field({ label }) {
  const [text, setText] = useState('');
  return (
    <label>
      {label}:{' '}
      <input type="text" value={text} placeholder={label} onChange={e => setText(e.target.value)} />
    </label>
  );
}

export { App };


// Solution: Add keys to tell React that each component is unique.
function UpdatedApp() {
  const [reverse, setReverse] = useState(false);

  let checkbox = (
    <label>
      <input type="checkbox" checked={reverse} onChange={e => setReverse(e.target.checked)} />
      Reverse order
    </label>
  );

  if (reverse) {
    return (
      <>
        <UpdatedField key={'lastName'} label="Last name" /> 
        <UpdatedField key={'firstName'} label="First name" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <UpdatedField key={'firstName'} label="First name" /> 
        <UpdatedField key={'lastName'} label="Last name" />
        {checkbox}
      </>
    );    
  }
}

function UpdatedField({ label }) {
  const [text, setText] = useState('');
  return (
    <label>
      {label}:{' '}
      <input type="text" value={text} placeholder={label} onChange={e => setText(e.target.value)} />
    </label>
  );
}

export { UpdatedApp };
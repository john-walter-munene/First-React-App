import { useState } from 'react';

export default function SyncedInputs() {
  return (
    <>
      <Input label="First input" />
      <Input label="Second input" />
    </>
  );
}

function Input({ label }) {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <label>
      {label}
      {' '}
      <input
        value={text}
        onChange={handleChange}
      />
    </label>
  );
}


// Solution.
function UpdatedSyncedInputs() {
    const [currentFormText, setCurrentFormText] = useState('');

    const handleChange = (event) => setCurrentFormText(event.target.value);

    return (
        <>
            <UpdatedInput label={"First Input"} value={currentFormText} 
            onChange={handleChange} />
            <UpdatedInput label={"SecondInput"} value={currentFormText} 
            onChange={handleChange} />
        </>
    );
}

function UpdatedInput({ value, label, onChange }) {
    
    return (
        <label>{label} {' '}
            <input value={value} onChange={onChange} />
        </label>
    );
}

export { UpdatedSyncedInputs }
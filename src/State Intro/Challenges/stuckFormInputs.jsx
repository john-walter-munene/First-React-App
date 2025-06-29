import { useState } from "react";
function Form() {
  let firstName = '';
  let lastName = '';

  function handleFirstNameChange(e) {
    firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    lastName = e.target.value;
  }

  function handleReset() {
    firstName = '';
    lastName = '';
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input placeholder="First name" value={firstName} onChange={handleFirstNameChange} />
      <input placeholder="Last name" value={lastName} onChange={handleLastNameChange} />

      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}

export { Form }

// Make variables remember values between rerenders
function UpdatedForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleFirstNameChange = (event) => { setFirstName(event.target.value); };
    const handleLastNameChange = (event) => { setLastName(event.target.value); };
    const handleReset = () => { setFirstName(''); setLastName(''); };

    return (
    <form onSubmit={e => e.preventDefault()}>
      <input placeholder="First name" value={firstName} onChange={handleFirstNameChange} />
      <input placeholder="Last name" value={lastName} onChange={handleLastNameChange} />

      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
  );
}

export { UpdatedForm };

// Using an object to handle multiple state updates.
function UpdatedFormObject() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,           // copy the existing state
      [name]: value          // update the field that changed
    }));
  };

  const handleReset = () => {
    setFormData({ firstName: '', lastName: '' });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <input name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} />
        <input name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} />

        <h1>Hi, {formData.firstName} {formData.lastName}</h1>
        <button onClick={handleReset}>Reset</button>
    </form>
  );
}

export { UpdatedFormObject };
// Wrong
import React from 'react'
 
function FormComponent() {
  const [name, setName] = React.useState('')
 
  const handleChange = (e) => {
    setName(e.target.value)
  }
 
  const handleSubmit = () => {
    const nameInput = document.querySelector('#name').value
 
    // checks if the input field is empty.
    // if it is an alert is fired.
    if (nameInput === '') {
      alert('name cannot be blank')
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
        <input id="name" name="full name" type="text" value={name} onChange={handleChange} placeholder="full name" />
    </form>
  );
}

// Use UseRef

function UpdatedFormComponent() {
  const inputRef = React.useRef(null)
  const [error, setError] = React.useState(false)
 
  const handleSubmit = (e) => {
    e.preventDefault()
    const value = inputRef.current.value
 
    if (!value) {
      setError(true)
    } else {
      // Submit the form
    }
  }
 
  const handleChange = () => {
    const value = inputRef.current.value
 
    if (value) {
      setError(false)
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} onChange={handleChange} />
      <button type="submit">Submit</button>
      {error && <p>name field cannot be blank, pleaseee!</p>}
    </form>
  )
}

export { FormComponent, UpdatedFormComponent };

// useRef to animate DOM elements
const RefExample = () => {
  const boxRef = React.useRef(null);
  const [isAnimating, setIsAnimating] = React.useState(false);
 
  function handleStartAnimation() {
    setIsAnimating(true);
    boxRef.current.style.transform = 'translateX(300px)';
    setTimeout(() => {
      setIsAnimating(false);
      boxRef.current.style.transform = '';
    }, 1000);
  }
 
  return (
    <div className="App">
      <div className={`box ${isAnimating ? 'is-animating' : ''}`} ref={boxRef}>
        <p>Hello, I'm an animated box!</p>
      </div>
      <button onClick={handleStartAnimation}>Start Animation</button>
    </div>
  );
}
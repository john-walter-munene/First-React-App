import { useState } from 'react';

export default function FeedbackForm() {
  const [name, setName] = useState('');

  function handleClick() {
    setName(prompt('What is your name?'));
    alert(`Hello, ${name}!`);
  }

  return (
    <button onClick={handleClick}>
      Greet
    </button>
  );
}

// Remove unncessary state.
function UpdatedFeedbackForm() {
    const handleClick = () => {
        let name = prompt('What is your name?')
        alert(`Hello, ${name}`);
    }

    return (<button onClick={handleClick}>Greet</button>)
}

export { UpdatedFeedbackForm };
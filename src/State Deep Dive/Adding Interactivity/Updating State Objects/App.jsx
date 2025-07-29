import { useState } from "react";

function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  typeof setPosition; // Clear console error.

  return (
    <div
      onPointerMove={e => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}

export { MovingDot };

// Treat state as immutable to trigger rerenders, and not compute with a changed state object.
function UpdatedMovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}

export { UpdatedMovingDot };

// Copying objects with the spread syntax

// These input fields don’t work because the onChange handlers mutate the state:
function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  typeof setPerson

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>First name:<input value={person.firstName} onChange={handleFirstNameChange} /></label>
      <label>Last name:<input value={person.lastName} onChange={handleLastNameChange} /></label>
      <label>Email:<input value={person.email} onChange={handleEmailChange} /></label>
      <p>{person.firstName}{' '}{person.lastName}{' '}({person.email})</p>
    </>
  );
}

export { Form };

// SLN:
function UpdatedForm() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  typeof setPerson

  function handleFirstNameChange(e) {
    setPerson({...person, firstName: e.target.value,})
  }

  function handleLastNameChange(e) {
    setPerson({...person, lastName: e.target.value});
  }

  function handleEmailChange(e) {
    setPerson({...person, email: e.target.value});
  }

  return (
    <>
      <label>First name:<input value={person.firstName} onChange={handleFirstNameChange} /></label>
      <label>Last name:<input value={person.lastName} onChange={handleLastNameChange} /></label>
      <label>Email:<input value={person.email} onChange={handleEmailChange} /></label>
      <p>{person.firstName}{' '}{person.lastName}{' '}({person.email})</p>
    </>
  );
}

export { UpdatedForm };

// Using a single event handler for multiple fields

function SuperForm() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  typeof setPerson

  function handleChange(event) {
    setPerson({...person, [event.target.name]: event.target.value});
  }

  return (
    <>
      <label>First name:<input value={person.firstName} onChange={handleChange} /></label>
      <label>Last name:<input value={person.lastName} onChange={handleChange} /></label>
      <label>Email:<input value={person.email} onChange={handleChange} /></label>
      <p>{person.firstName}{' '}{person.lastName}{' '}({person.email})</p>
    </>
  );
}

export { SuperForm };


// Updating a nested object.
function SuperBigForm() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>Name:<input value={person.name} onChange={handleNameChange} /></label>
      <label>Title:<input value={person.artwork.title} onChange={handleTitleChange} /></label>
      <label>City:<input value={person.artwork.city} onChange={handleCityChange} /></label>
      <label>Image:<input value={person.artwork.image} onChange={handleImageChange}/></label>
      <p><i>{person.artwork.title}</i>{' by '}{person.name}<br />(located in {person.artwork.city})</p>
      <img src={person.artwork.image} alt={person.artwork.title}
      />
    </>
  );
}

export { SuperBigForm };
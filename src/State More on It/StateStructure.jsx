import { useState } from "react";


// How to structure state.
function Person() {
    const [person, setPerson] = useState({ name: "John", age: 24, });
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const fullName = `${firstName} ${lastName}`;

    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);

    

    // BAD Don't do this.
    const handIncreaseAge = () => {
        // Mutating the current state object.
        person.age = person.age + 1;
        setPerson(person);
    }

    console.log(typeof handIncreaseAge); // Clear console error.

    // GOOD Dp this!
    const handleIncreaseAgeCorrect = () => {
        // Copy the existing person object into a new object.
        // While updating the age property.
        const newPerson = { ...person, age:  person.age + 1, };
        setPerson(newPerson);
    }

    const NameLabels = ({ label, onChange }) => {
        return (
            <label>
                {label} <input onChange={onChange} />
            </label>
        );
    }

    return (
        <>
            <h1>{fullName}</h1>
            <h2>{person.age}</h2>

            <button onClick={handleIncreaseAgeCorrect}>Increase age</button>

            <NameLabels label="First Name" onChange={handleFirstNameChange}/>
            <NameLabels label="Last Name" onChange={handleLastNameChange}/>
        </>
    );
}

export { Person };

// How state updates.
function NewPerson() {
    const [person, setPerson] = useState({ name: "John", age: 100, });

    const handleIncreaseAge = () => {
        console.log(`In handleIncreaseAge (before setPerson call): ${person}`);
        setPerson({ ...person, age: person.age + 1});
        // We've called setPerson, surely person has updated?
        console.log(`in handleIncreaseAge (after setPerson call): ${person}`);
    };

    // this console.log  runs everytime the component renders.
    console.log(`During render: ${person}`);

    return (
        <>
            <h1>{person.name}</h1>
            <h2>{person.age}</h2>

            <button onClick={handleIncreaseAge}>Increase Age</button>
        </>
    );
}

export { NewPerson };

// Infinite loop.

function Component() {
  const [count, setCount] = useState(0);

  setCount(count + 1);

  return <h1>{count}</h1>;
}

console.log(typeof Component);

// State Updater functions.
// const handleIncreaseAge = () => {
//     const [person, setPerson] = useState({ name: "John", age: 24});

//   setPerson({ ...person, age: person.age + 1 });
//   setPerson({ ...person, age: person.age + 1 });
// };

console.log(typeof handleIncreaseAge);
// This snippet does not update the age to 2.

// An updater function.
function PersonComponent() {
    const [person, setPerson] = useState({ name: "John", age: 24});

    const handleIncreaseAge = () => {
        setPerson((prevPerson) => ({...prevPerson, age: prevPerson.age + 1, }));
        setPerson((prevPerson) => ({ ...prevPerson, age: prevPerson.age + 1}));
    }


    return (
        <div>
            <p>{person.name} is {person.age} years old.</p>
            <button onClick={handleIncreaseAge}>Increase Age by 2</button>
        </div>
    );
}

export { PersonComponent };

// Controlled components
function CustomInput() {
    const [value, setValue] = useState('');

    return (
        <input type="text" value={value} onChange={(event) => setValue(event.target.value)}/>
    );
}

export { CustomInput };

// Final updated person.

function UpdatedPerson() {
    const [person, setPerson] = useState({
        firstName: "John",
        lastName: "Doe",
        age: 24,
    });

    const fullName = `${person.firstName} ${person.lastName}`;

    const handleFirstNameChange = (event) => {
        setPerson({ ...person, firstName: event.target.value });
    };

    const handleLastNameChange = (event) => {
        setPerson({ ...person, lastName: event.target.value });
    };

    const handleIncreaseAge = () => {
        setPerson({ ...person, age: person.age + 1 });
    };

    const NameInput = ({ label, value, onChange }) => (
        <label>
            {label} <input value={value} onChange={onChange} />
        </label>
    );

    return (
        <>
            <h1>{fullName}</h1>
            <h2>Age: {person.age}</h2>

            <button onClick={handleIncreaseAge}>Increase Age</button>

            <div>
                <NameInput
                    label="First Name"
                    value={person.firstName}
                    onChange={handleFirstNameChange}
                />
            </div>
            <div>
                <NameInput
                    label="Last Name"
                    value={person.lastName}
                    onChange={handleLastNameChange}
                />
            </div>
        </>
    );
}

export { UpdatedPerson };
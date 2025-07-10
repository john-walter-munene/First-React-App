// Setting state triggers renders 

import { useState } from "react";

function Form() {
    const [isSent, setIsSent] = useState(false);
    const [message, setMessage] = useState('Hi!');

    if (isSent) return (<h1>Your message is on its way</h1>)

    return (
        <form onSubmit={(event) => { event.preventDefault(); setIsSent(true); sendMessage(message); }}>
            <textarea placeholder="Message" value={message} 
                onChange={event => setMessage(event.target.value)} />
        </form>
    );
}


function sendMessage(message) {
    // ...
    console.log(message);
}

export { Form };

// Rendering takes a snapshot in time
// Below code only increments the number by one, as each function call is refereence to state update
// Each call us an indiviual update, each time, the call uses a default of zero asking it to be updated to +1
// The function calls will only update once, unless I use an updater function.

function Counter() {
    const [number, setNumber] = useState(0);

    return (
        <>
            <h1>{number}</h1>
            <button onClick={() => {
                setNumber(number + 1);
                setNumber(number + 1);
                setNumber(number + 1);
            }}></button>
        </>
    );
}

export { Counter };

// State over time
function NewCounter() {
    const [number, setNumber] = useState(0);

    return (
        <>
            <h1>{number}</h1>
            <button onClick={() => {
                setNumber(number + 5);
                alert(number);
            }}>+5</button>
        </>
    );
}

export { NewCounter };

// A state variable’s value never changes within a render 
// It only changes within a re render.
function StateBehaviorTestForm() {
    const [recipient, setRecipeint] = useState("Olive");
    const [message, setMessage] = useState("Hello");

    const handleSubmit = (event) => {event.preventDefault(); setTimeout(() => alert(`You sent "${message}" to ${recipient}`), 5000)};
    const formStyles = {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    };

    return (
        <form onSubmit={handleSubmit} style={{...formStyles}}>
            <label>
                    To:{" "}
                    <select value={recipient} onChange={(event) => setRecipeint(event.target.value)}>
                        <option value="Olive">Olive</option>
                        <option value="Valentino">Valentino</option>
                    </select>
            </label>
            <textarea placeholder="Message" value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
            <button type="submit">Send</button>
        </form>
    );
}

export { StateBehaviorTestForm };

// Test
// Implement a traffic light 

function TrafficLight() {
    const [walk, setWalk] = useState(true);

    const handleClick = () => {
        setWalk(!walk);
        if (walk) alert(`Stop is Next`);
        else alert(`Walk is next`);

        // For preciseness
        //  alert(walk ? 'Stop is next' : 'Walk is next');
    };

    return (
        <>
        <button onClick={handleClick}>Change to {walk ? 'Stop': 'Walk'}</button>
        <h1 style={{ color: walk? 'darkgreen': 'darkred'}}>{walk? 'Walk': 'Stop'}</h1>
        </>
    );
}

export { TrafficLight };
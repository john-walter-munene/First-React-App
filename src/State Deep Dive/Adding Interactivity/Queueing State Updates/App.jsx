import { useState } from "react";

function Counter() {
    const [number, setNumber] = useState(0);
    
    return (
        <>
            <h1>{number}</h1>
            <button onClick={() => {
                setNumber(number + 1);
                setNumber(number + 1);
                setNumber(number + 1);
            }}>+3</button>
        </>
    );
}

// Above code only updates the counter one time.
// Each render values are fixed.

export { Counter };

// Solution.
// Updating the same state multiple times before the next render 
function UpdatedCounter() {
    const [number, setNumber] = useState(0);

    return (
        <>
            <h1>{number}</h1>
            <button onClick={() => {
                setNumber(n => n + 1);
                setNumber(n => n + 1);
                setNumber(n => n + 1);
                }}>+3</button>
        </>
    );
}

export { UpdatedCounter };
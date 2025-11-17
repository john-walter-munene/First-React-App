import { useEffect, useState } from "react";

function SampleClock() {
    const [counter, setCounter] = useState(0);

    setInterval(() => {
        setCounter(count => setCounter(count + 1))
    }, 1000);

    return (<p>{counter} seconds have passed</p>);
}

// Above code gets wild because.
// SetInterval is called on every rerender.
// It triggers some infite rerendering loop.

// Soln: useEffect.
function BetterSampleClock() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCounter(count => count + 1);
        }, 1000)
    });

    return (<p>{counter} seconds have passed</p>);
}

// Using the dependency array to set when a hook rerenders.
// Keeping it empty ensures the hook runs only once.

function ClassicSampleClock() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setCounter(count => count + 1);
        }, 1000);
    }, []);

    return (<p>{counter} seconds have passed.</p>);
}

export { SampleClock, BetterSampleClock, ClassicSampleClock };

// // In general. 
// useEffect(() => {
//   // This runs after every render
// });

// useEffect(() => {
//   // This runs only on mount (when the component appears)
// }, []);

// useEffect(() => {
//   // This runs on mount *and also* if either a or b have changed since the last render
// }, [a, b]);

// The clean up function. 
function SuperClock() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const key = setInterval(() => {
            setCounter(count => count + 1);
        }, 1000);

        return () => {
            clearInterval(key);
        };

    }, []);

    return (<p>{counter} seconds have passed.</p>);
}

export { SuperClock };

// useEffect Summary.
// useEffect(
//   () => {
//     // execute side effect
//     return () => {
//       // cleanup function on unmounting or re-running effect
//     }
//   },
//   // optional dependency array
//   [/* 0 or more entries */]
// );

// You don't need an effect if:
// You're only calculating sth based on state during rendering.
function AdditionDisplay() {
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);

    // This is all unnecessary.

    // const [sum, setSum] = useState(0);
    // useEffect(() => {
    //   setSum(number1 + number2);
    // }, [number1, number2]);

    const sum = number1 + number2;
    typeof setNumber1, typeof setNumber2;

    return (
      <p>{number1} + {number2} = {sum}</p>
    );
  }

// No need for effects for events.
function App() {
    const [input, setInput] = useState("");

    const handleInput = (e) => {
      setInput(e.target.value);
    };

    // You should avoid direct manipulation when not necessary

    // useEffect(() => {
    //   document.getElementById("name").addEventListener("change", handleInput);
    //   return () => {
    //     document.getElementById("name").removeEventListener("change", handleInput);
    //   }
    // });

    return (
      <>
        {/* <input id="name" /> */}

        <input onChange={handleInput} value={input} />
        <p>{ input }</p>
      </>
    );
  }

export { AdditionDisplay, App };

// No need of effects to reset state based on some conditions. Use keys.
// Having issues to manage state, lift it up, instead of using an effect.
import { useState } from "react";
import 'state.css';

// State in React
// const [stateValue, setStateValue] = useState(initialValue);

// adapted for our use case:
// const [backgroundColor, setBackgroundColor] = useState(initialColor);

const COLORS = ["pink", "green", "blue", "yellow", "purple", ];

function App() {
    const [ backgroundColor, setBackgroundColor ] = useState(COLORS[0]);

    const onButtonClick = (color) => () => {
        setBackgroundColor(color);
    }

    return (
        <div className="App" style={{backgroundColor}}>
            {COLORS.map((color) => (
                <button type="button" key={color} 
                    className={backgroundColor === color ? "selected" : ""}
                    onClick={onButtonClick(color)}>{color}</button>
            ))}
        </div>
    );
}

export { App };

// Update above application to track the number of times the background color is changed.
function UpdatedApp() {
    const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);
    const [timesBackgroundChanges, setTimesBackgroundChanges] = useState(0);

    const onButtonClick = (color) => {
        if (color !== backgroundColor) {
            setBackgroundColor(color);
            setTimesBackgroundChanges((prevCount) => prevCount + 1);
        }
    }

    return (
        <>
            {(timesBackgroundChanges > 0) &&  (<p>The background has changes {timesBackgroundChanges} 
                {timesBackgroundChanges === 1 ? "time" : "times"}</p>)}
                
            <div className="App" style={{backgroundColor}}>
                {COLORS.map((color) => {
                    return (
                        <button type="button" key={color} 
                            className={backgroundColor === color? "selected" : ""}
                            onClick={() => onButtonClick(color)}>{color}</button>
                    );
                })}
            </div>
        </>
    );
}

export { UpdatedApp };
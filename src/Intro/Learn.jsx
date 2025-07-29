// Implementing a functional based component on ReactJS

import { useState } from "react";

function Application() {
    const [message, setMessage] = useState("Hello World");

    const changeMessage = () => {
        setMessage("Welcome to React!");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>{message}</h1> {/*Display the dynamic message*/}

            <button onClick={changeMessage}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginBottom: "20px"
                    }}
                >Click Me!</button>
        </div>
    )
}

export { Application };
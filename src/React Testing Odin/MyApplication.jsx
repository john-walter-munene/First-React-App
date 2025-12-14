import { useState } from "react";

const MyApplication = () => {
    const [heading, setHeading] = useState("Magnificent Monkeys");

    const clickHandler = () => {
        setHeading("Radical Rhinos");
    };

    return (
        <>
            <button type="button" onClick={clickHandler}>Click Me</button>
            <h1>{heading}</h1>
        </>
    );
};

export { MyApplication };
import { useContext } from "react";
import { LevelContext } from "./LevelContext";

function Heading({ level, children }) {
    switch(level) {
        case 1:
            return <h1>{children}</h1>;
        case 2:
            return <h1>{children}</h1>;
        case 3:
            return <h1>{children}</h1>;
        case 4:
            return <h1>{children}</h1>;
        case 5:
            return <h1>{children}</h1>;
        default:
            throw new Error(`Unknown level ${level}`);
    }
}

export { Heading };

function UpdatedHeading({ children }) {
    const level = useContext(LevelContext);

     switch(level) {
        case 1:
            return <h1>{children}</h1>;
        case 2:
            return <h1>{children}</h1>;
        case 3:
            return <h1>{children}</h1>;
        case 4:
            return <h1>{children}</h1>;
        case 5:
            return <h1>{children}</h1>;
        default:
            throw new Error(`Unknown level ${level}`);
    }
}

export { UpdatedHeading };
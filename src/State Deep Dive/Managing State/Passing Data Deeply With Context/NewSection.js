// Using and providing context from the same component

import { useContext } from "react";
import { LevelContext } from "./NewLevelContext";

function Section({ children }) {
    const level = useContext(LevelContext);

    return (
        <section className="section">
            <LevelContext value={level + 1}>{children}</LevelContext>
        </section>
    );
}

function UpdatedSection({ children, isFancy }) {
    const level = useContext(LevelContext);
    return (
        <section className={'section' + (isFancy ? 'fancy': '')}>
            <LevelContext level={level}>{children}</LevelContext>
        </section>
    );
}

export { Section, UpdatedSection };

// Before using context.
// 1. Start by passing props. 
// 2. Extract components and pass JSX as children to them. 

// Use cases for context 
// Theming
// Current account
// Routing
// Managing state

// Summary
// Context lets a component provide some information to the entire tree below it.
// To pass context:
// Create and export it with export const MyContext = createContext(defaultValue).
// Pass it to the useContext(MyContext) Hook to read it in any child component, no matter how deep.
// Wrap children into <MyContext value={...}> to provide it from a parent.
// Context passes through any components in the middle.
// Context lets you write components that “adapt to their surroundings”.
// Before you use context, try passing props or passing JSX as children.
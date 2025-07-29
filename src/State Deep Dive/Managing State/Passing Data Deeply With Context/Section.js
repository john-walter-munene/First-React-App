import { LevelContext } from "./LevelContext";

function Section({ children }) {
    return (<section className="section">{children}</section>);
}

export { Section };

// Provide the context.
function UpdatedSection({ level, children }) {
    return (
        <section className="section">
            <LevelContext value={level}>{children}</LevelContext>
        </section>
    );
}

export { UpdatedSection };
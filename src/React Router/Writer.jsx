import { Link } from "react-router";

function TechnicalWriter() {
    return (
        <div className="writer">
            <h1>I'm John Walter</h1>

            <p>A technical writer doing developer content on both Web2, and Web3 ecosystems</p>
            <p>Hit me up and let's see how my writing skills can help with the story telling of your products.</p>

            <button><Link to="/">Home</Link></button>
        </div>
    );
}

export { TechnicalWriter };
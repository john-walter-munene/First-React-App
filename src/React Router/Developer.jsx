import { Link } from "react-router";
function Developer() {
    return (
        <div className="developer">
            <h1>I'm John Walter Munene.</h1>

            <p> A JavaScript developer working on fullstack applications using React and Node or Deno</p>
            <p>I'm seeking a contemporray role where my skills can be put into action for me to gain more of them while serving a bread and butter</p>
            
            <button><Link to="/">Home</Link></button>
        </div>
    );
}

export { Developer };
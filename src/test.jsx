

function ReactComponent() {
    return (
        <div>
            <h1>Test title</h1>

            <svg>
                <circle cx="25" cy="75" r="20" stroke="green" strokeWidth="2" />
            </svg>

            <form>
                <input type="text"/>
            </form>
        </div>
    );
}

export { ReactComponent };

export default function Bio() {
  return (
    <div>
      <div className="intro">
        <h1>Welcome to my website!</h1>
      </div>
      <p className="summary">
        You can find my thoughts here.
        <br />
        <br />
        <b>
          And <i>pictures</i>
        </b>{" "}
        of scientists!
      </p>
    </div>
  );
}
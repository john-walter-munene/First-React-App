function App() {
  return (
    <div>
      <h1>Animals: </h1>
      <ul>
        <li>Lion</li>
        <li>Cow</li>
        <li>Snake</li>
        <li>Lizard</li>
      </ul>
    </div>
  );
}


function NewApp() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];

    return (
        <>
            <h1>Animals</h1>
            <ul>
                {animals.map((animal) => {
                    return <li key={animal}>{animal}</li>;
                })}
            </ul>
        </>
    )
}

function MoreNewerApp() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];
    const animalsList = animals.map((animal) => <li key={animal}>{animal}</li>);

    return (
        <>
            <h1>Animals</h1>
            <ul>{animalsList}</ul>
        </>
    );
}

export { App };

// Rendering a list of components in JSX
function ListItem(props) {
    return <li>{props.animal}</li>
}

function List(props) {
    return (
        <ul>
            {props.animals.map((animal) => {return <ListItem key={animal} animal={animal}/>})}
        </ul>
    )
}

function SuperNewerApp() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];

    return (
        <div>
            <h1>Animals</h1>
            <List animals={animals}/>
        </div>
    )
}

// Conditionally rendering UI.

// Using the ternary operator
function ListTwo(props) {
    return (
        <ul>
            { props.animals.map((animal) => {
                return animal.startsWith("L") ? <li key={animal}>{animal}</li> : null;
            })}
        </ul>
    )
}

function AppTwo() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];

    return (
        <div>
            <h1>Animals</h1>
            <List animals={animals}/>
        </div>
    )
}

// Using the && operator
function ListThree(props) {
    return (
        <ul>
            { props.animals.map((animal) => {
                return animal.startsWith("L") && <li key={animal}>{animal}</li>;
            })}
        </ul>
    )
}

function AppThree() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];

    return (
        <div>
            <h1>Animals</h1>
            <List animals={animals}/>
        </div>
    )
}

// Other ways to render conditionally
// if, if/else, and switch

function ListFour(props) {
    if (!props.animals) { 
        return <div>Loading...</div> 
    }

    if (props.animals.length === 0) {
        return <div>There are no animals in the list.</div>
    }

    return (
        <ul>
            { props.animals.map((animal) => {
                return <li key={animal}>{animal}</li>;
            })}
        </ul>
    );
}

function AppFour() {
    const animals = [];

    return (
        <div>
            <h1>Animals</h1>
            <ListFour animals={animals} />
        </div>
    )
}

// Achieving above solution using the ternary operator.
function ListFive(props) {
  return (
    <>
      {!props.animals ? (
        <div>Loading...</div>
      ) : props.animals.length > 0 ? (
        <ul>
          {props.animals.map((animal) => {
            return <li key={animal}>{animal}</li>;
          })}
        </ul>
      ) : (
        <div>There are no animals in the list!</div>
      )}
    </>
  );
}

// or
function ListSix(props) {
  return (
    <>
      {!props.animals && <div>Loading...</div>}
      {props.animals && props.animals.length > 0 && (
        <ul>
          {props.animals.map((animal) => {
            return <li key={animal}>{animal}</li>;
          })}
        </ul>
      )}
      {props.animals && props.animals.length === 0 && <div>There are no animals in the list!</div>}
    </>
  );
}

function AppFiveOrSix() {
  const animals = [];

  return (
    <div>
      <h1>Animals: </h1>
      <ListFive animals={animals} />
      {/* Or... */}
      <ListSix animals={animals} />
    </div>
  );
} 

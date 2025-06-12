function AppOne() {
    return (
        <div>
            <h1>Animals</h1>
            <ul>
                <li>Lion</li>
                <li>Cow</li>
                <li>Snake</li>
                <li>Lizard</li>
            </ul>
        </div>
    );
}

function AppTwo() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];

    return (
        <div>
            <h1>Animals</h1>
            <ul>
                {animals.map((animal) => {
                    return <li key={animal}>{animal}</li>
                })}
            </ul>
        </div>
    );
}

function AppThree() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];
    const animalsList = animals.map((animal) => <li key={animal}>{animal}</li>);

    return (
        <div>
            <h1>Animals</h1>
            <ul>
                {animalsList}
            </ul>
        </div>
    );
}

function ListItemOne(props) {
    return <li>{props.animal}</li>
}

function ListOne(props) {
    return (
        <ul>
            {props.animals.map((animal) => {
                return <ListItemOne key={animal} animal={animal} />
            })}
        </ul>
    );
}

function AppThreeNew() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];

    return (
        <div>
            <h1>Animals</h1>
            <ListOne animals={animals}/>
        </div>
    );
}

// Conditionally rendering UI.

// Using the ternary operator.
function ListFour(props) {
    return (
        <ul>
            {props.animals.map((animal) => {
                return animal.startsWith("L") ? <li key={animal}>{animal}</li> : null;
            })}
        </ul>
    );
}

function AppFour() {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];

    return (
        <div>
            <h1>Animals</h1>
            <ListFour animals={animals} />
        </div>
    );
}

// Using the && operator
function ListFive(props) {
    return (
        <ul>
            {props.animals.map((animal) => {
                return animal.startsWith("L") && <li key={animal}>{animal}</li>
            })}
        </ul>
    );
}

function AppFive () {
    const animals = ["Lion", "Cow", "Snake", "Lizard"];

    return (
        <div>
            <h1>Animals</h1>
            <ListFive animals={animals} />
        </div>
    );
}

// Other ways to render conditionally
function ListSix(props) {
    if (!props.animals) return <div>Loading...</div>

    if (props.animals.length === 0) return <div>There are no animals in the list</div>

    return (
        <ul>
            {props.animals.map((animal) => {
                return <li key={animal}>{animal}</li>
            })}
        </ul>
    );
}

function Appsix() {
    const animals = [];

    return (
        <div>
            <h1>Animals</h1>
            <ListSix animals={animals}/>
        </div>
    );
}

export { 
    AppOne, 
    AppTwo, 
    AppThree, 
    ListItemOne,
    AppFour,
};
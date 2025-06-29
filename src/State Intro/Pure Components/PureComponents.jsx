function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}

export { App };

// Side Effects: (un)intended consequences
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}

// You can fix this component by passing guest as a prop instead:
function UpdatedCup({ guest }) {
    return (<h2>Tea cup for guest#{guest}</h2>);
} 

function UpdatedTeaSet() {
    return (
        <>
            <UpdatedCup guest={1} />
            <UpdatedCup guest={2} />
            <UpdatedCup guest={3} />
        </>
    );
}

// Local mutation: Your component’s little secret
function NewCup({guest}) {
    return ( <h2>Tea cup for #{guest}</h2> );
}

function TeaGathering() {
    const cups = []; 

    for (let count = 1; count <=12; count++) {
        cups.push(<NewCup key={count} guest={count} />);
    }

    return cups;
}

export { TeaSet, UpdatedTeaSet, };


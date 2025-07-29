import { useState } from "react";

// Updating state in arrays.

//Adding to an array
let nextId = 0;

function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);
  typeof setArtists // Clear TS config errors.

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => {
        artists.push({ id: nextId++, name: name,});
        }}>Add</button>

      <ul>{artists.map(artist => (<li key={artist.id}>{artist.name}</li>))}</ul>
    </>
  );
}

export { List };

// Instead, I will want to create a new array
// Add a new item as the end.
// Update state to use the new array.
function UpdatedList() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
            setArtists([
            ...artists,
            { id: nextId++, name: name }
            ]);
        }}>Add</button>
      <ul>{artists.map(artist => (<li key={artist.id}>{artist.name}</li>))}</ul>
    </>
  );
}

 export { UpdatedList };

//   Prepend attems in an array by placing the before the spread syntax
// setArtists([
//   { id: nextId++, name: name },
//   ...artists // Put old items at the end
// ]);

// Removing from an array.
let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

function ListTwo() {
  const [artists, setArtists] = useState(initialArtists);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}{' '}<button onClick={() => {setArtists(artists.filter(a => a.id !== artist.id))}}>Delete</button></li>
        ))}
      </ul>
    </>
  );
}

export { ListTwo };

// Transforming an array.
let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

function ShapeEditor() {
  const [shapes, setShapes] = useState(initialShapes);

  function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') return shape; // No change
      else return {...shape, y: shape.y + 50, }; // Return a new circle 50px below
    });

    setShapes(nextShapes); // Re-render with the new array
  }

  return (
    <>
      <button onClick={handleClick}>Move circles down!</button>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
          background: 'purple',
          position: 'absolute',
          left: shape.x,
          top: shape.y,
          borderRadius:
            shape.type === 'circle'
              ? '50%' : '',
          width: 20,
          height: 20,
        }} />
      ))}
    </>
  );
}

export { ShapeEditor };

// Replacing items in an array 
let initialCounters = [
  0, 0, 0
];

export default function CounterList() {
  const [counters, setCounters] = useState(initialCounters);

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) return c + 1; // Increment the clicked counter
      else return c; // The rest haven't changed
    });

    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>{counter}<button onClick={() => handleIncrementClick(i)}>+1</button></li>
      ))}
    </ul>
  );
}

// Inserting into an array
let nextIdForAddList = 3;

const initialArtistsForAdd = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

function AddedList() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(initialArtistsForAdd);

  function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextIdForAddList++, name: name },
      // Items after the insertion point:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleClick}>Insert</button>
      <ul>{artists.map(artist => (<li key={artist.id}>{artist.name}</li>))}</ul>
    </>
  );
}

export { AddedList };

// Making other changes to an array
const initialListForMod = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

 function ListForMod() {
  const [list, setList] = useState(initialListForMod);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>Reverse</button>
      <ul>{list.map(artwork => (<li key={artwork.id}>{artwork.title}</li>))}</ul>
    </>
  );
}

export { ListForMod };

// Updating objects inside arrays

// The code below mutates the arrays as direct assignment, even from a copy of an object mutates the original array.
// let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(initialList);

  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    const artwork = myNextList.find(a => a.id === artworkId);
    artwork.seen = nextSeen;
    setMyList(myNextList);
  }

  function handleToggleYourList(artworkId, nextSeen) {
    const yourNextList = [...yourList];
    const artwork = yourNextList.find(a => a.id === artworkId);
    artwork.seen = nextSeen;
    setYourList(yourNextList);
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList artworks={myList} onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList artworks={yourList} onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label><input type="checkbox" checked={artwork.seen}onChange={e => {
          onToggle(artwork.id, e.target.checked); }} />{artwork.title}</label>
        </li>
      ))}
    </ul>
  );
}

export { BucketList };

// Solution, use spread syntax to create a shallow copy of the object
function UpdatedBucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(initialList);

  function handleToggleMyList(artworkId, nextSeen) {
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) return { ...artwork, seen: nextSeen };// Create a *new* object with changes
      else return artwork; // No changes
    }));
  }

  function handleToggleYourList(artworkId, nextSeen) {
    setYourList(yourList.map(artwork => {
      if (artwork.id === artworkId) return { ...artwork, seen: nextSeen }; // Create a *new* object with changes
      else return artwork; // No changes
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList artworks={myList} onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList artworks={yourList} onToggle={handleToggleYourList} />
    </>
  );
}

export { UpdatedBucketList}
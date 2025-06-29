// How to add a state variable with the useState Hook
// What pair of values the useState Hook returns
// How to add more than one state variable
// Why state is called local

import { useState } from "react";

// Test rerender for a component
import { sculptureList } from "./data";

function Gallery() {
    let index = 0;

    const handleClick = () => { index = index + 1};

    let sculpture = sculptureList[index];

    return (
        <>
            <button onClick={handleClick}>Next</button>

            <h2><i>{sculpture.name}</i> by {sculpture.artist}</h2>

            <h3>({index + 1} of {sculptureList.length})</h3>

            <img src={sculpture.url} alt={sculpture.alt} />

            <p>{sculpture.description}</p>
        </>
    );
}

export { Gallery };

// Soln...

function UpdatedGallery() {
    const [index, setIndex] = useState(0);

    const handleClick = () => { setIndex(index + 1) };

    let sculpture = sculptureList[index];

    return (
        <>
            <button onClick={handleClick}>Next</button>

            <h2><i>{sculpture.name}</i> by {sculpture.artist}</h2>

            <h3>({index + 1} of {sculptureList.length})</h3>

            <img src={sculpture.url} alt={sculpture.alt} />

            <p>{sculpture.description}</p>
        </>
    );
}

export { UpdatedGallery };

// Giving a component multiple state variables.
function UpdatedNewGallery() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    const handleNextClick = () => { setIndex(index + 1) };
    const handleMoreClick = () => { setShowMore(!showMore) };

    let sculpture = sculptureList[index];

     return (
    <>
      <button onClick={handleNextClick}>Next</button>

      <h2><i>{sculpture.name} </i>by {sculpture.artist}</h2>
      
      <h3>({index + 1} of {sculptureList.length})</h3>
      
      <button onClick={handleMoreClick}>{showMore ? 'Hide' : 'Show'} details</button>

      {showMore && <p>{sculpture.description}</p>}

      <img src={sculpture.url} alt={sculpture.alt} />
    </>
  );
}

export { UpdatedNewGallery };
// Starting point.

import { useState } from "react";
import { sculptureList } from "./data";

function Gallery() {
    let index = 0;

    const handleClick = () => index = index + 1;

    let sculpture = sculptureList[index];

    return (
        <>
            <button onClick={handleClick}>Next</button>
            <h2><i>{sculpture.name}</i> by {sculpture.artist}</h2>
            <h3>({index + 1} of {sculptureList.length})</h3>
            <img src={sculpture.url} alt={sculpture.alt}/>
            <p>{sculpture.description}</p>
        </>
    );
}

export { Gallery };

// Above code won't work.
// Fix it bu using useSate.

function NewGallery() {
    const [index, setIndex] = useState(0);

    const handleClick = () => setIndex(index + 1);

    let sculpture = sculptureList[index];

    return (
        <>
            <button onClick={handleClick}>Next</button>
            <h2><i>{sculpture.name}</i> by {sculpture.artist}</h2>
            <h3>({index + 1}) of {sculptureList.length}</h3>
            <img src={sculpture.url} alt={sculpture.alt}/>
            <p>{sculpture.description}</p>
        </>
    );
}

export { NewGallery };

// Giving a component mulitple state variables.
function UpdatedGallery() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    const handleNextClick = () => setIndex(index + 1);
    const handleMoreClick = () => setShowMore(!showMore);

let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>Next</button>
      <h2><i>{sculpture.name} </i> by {sculpture.artist}</h2>
      <h3>({index + 1} of {sculptureList.length})</h3>
      <button onClick={handleMoreClick}>{showMore ? 'Hide' : 'Show'} details</button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt}/>
    </>
  );
}

export { UpdatedGallery };

// State is isolated and private
function DualGallery() {
    return (
        <div>
            <UpdatedGallery />
            <UpdatedGallery />
        </div>
    );
}

// Each of the above Gallery componenets maintain their indipendent state.
export { DualGallery };
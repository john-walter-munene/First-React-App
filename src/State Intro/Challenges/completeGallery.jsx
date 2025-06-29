import { useState } from "react";
import { sculptureList } from "./data";

function Gallery() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    function handleNextClick() {
        setIndex(index + 1);
    }

    function handleMoreClick() {
        setShowMore(!showMore);
    }

    let sculpture = sculptureList[index];

    return (
        <>
            <button onClick={handleNextClick}>Next</button>
        
            <h2><i>{sculpture.name} </i> by {sculpture.artist}</h2>
        
            <h3>({index + 1} of {sculptureList.length})</h3>

            <button onClick={handleMoreClick}>{showMore ? 'Hide' : 'Show'} details</button>
            
            {showMore && <p>{sculpture.description}</p>}
        
            <img src={sculpture.url} alt={sculpture.alt} />
        </>
    );
}

export { Gallery };

// Solutions
// Add extra logic to prevent event handler

// Prevent action.
function UpdatedGalleryOne () {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    const handleNextClick = () => {
        if (index === sculptureList.length -1) return null;
        setIndex(index + 1);
    }

    const handleMoreClick = () => { setShowMore(!showMore) };

    let sculpture = sculptureList[index];

    return (
        <>
            <button onClick={handleNextClick}>Next</button>
        
            <h2><i>{sculpture.name} </i> by {sculpture.artist}</h2>
        
            <h3>({index + 1} of {sculptureList.length})</h3>

            <button onClick={handleMoreClick}>{showMore ? 'Hide' : 'Show'} details</button>
            
            {showMore && <p>{sculpture.description}</p>}
        
            <img src={sculpture.url} alt={sculpture.alt} />
        </>
    );
}

// Turning Gallery into a carousel.
function UpdatedGalleryTwo () {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    const handleNextClick = () => {
        setIndex((prevIndex) => (prevIndex + 1) % sculptureList.length);
    };

    const handleMoreClick = () => {
        setShowMore((prevShowMore) => !prevShowMore);
    };

    const sculpture = sculptureList[index];

    return (
        <>
            <button onClick={handleNextClick}>Next</button>
        
            <h2><i>{sculpture.name}</i> by {sculpture.artist}</h2>
        
            <h3>({index + 1} of {sculptureList.length})</h3>

            <button onClick={handleMoreClick}>{showMore ? 'Hide' : 'Show'} details</button>
            
            {showMore && <p>{sculpture.description}</p>}
        
            <img src={sculpture.url} alt={sculpture.alt} />
        </>
    );
}

// Disabling button when not possible
function UpdatedGalleryThree () {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    let hasPrev = index > 0;
    let hasNext = index < sculptureList.length - 1;

    const handlePrevClick = () => { if (hasPrev) setIndex(index - 1); };
    const handleNextClick = () => { if (hasNext) setIndex(index + 1); };
    const handleMoreClick = () => { setShowMore(!showMore); };

    let sculpture = sculptureList[index];

    return (
        <>
            <button onClick={handlePrevClick} disabled={!hasPrev}>Previous</button>
            <button onClick={handleNextClick} disabled={!hasNext}>Next</button>
            
            <h2><i>{sculpture.name} </i> by {sculpture.artist}</h2>
            
            <h3>({index + 1} of {sculptureList.length})</h3>

            <button onClick={handleMoreClick}>{showMore ? 'Hide' : 'Show'} details</button>

            {showMore && <p>{sculpture.description}</p>}
            
            <img src={sculpture.url} alt={sculpture.alt} />
        </>
    );
}

export { UpdatedGalleryOne, UpdatedGalleryTwo, UpdatedGalleryThree };
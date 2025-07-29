import { useState } from 'react';
import { useContext } from 'react';
import { ImageSizeContext } from './Context.js';
import { places } from './data.js';
import { getImageUrl } from './utils.js';

// Currently, App passes imageSize to List, which passes it to each Place, which passes it to the PlaceImage. 
// Remove the imageSize prop, and instead pass it from the App component directly to PlaceImage.

export default function App() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  return (
    <>
      <label>
        <input type="checkbox" checked={isLarge} onChange={e => {setIsLarge(e.target.checked);}}/>
        Use large images
      </label>
      <hr />
      <List imageSize={imageSize} />
    </>
  );
}

function List({ imageSize }) {
  const listItems = places.map(place =>
    <li key={place.id}>
      <Place place={place} imageSize={imageSize} />
    </li>
  );
  return <ul>{listItems}</ul>;
}

function Place({ place, imageSize }) {
  return (
    <>
      <PlaceImage place={place} imageSize={imageSize} />
      <p><b>{place.name}</b>{': ' + place.description}</p>
    </>
  );
}

function PlaceImage({ place, imageSize }) {
  return (<img src={getImageUrl(place)} alt={place.name} width={imageSize} height={imageSize} />);
}

// Solution.
export function UpdatedApp() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  return (
    <ImageSizeContext value={imageSize}>
      <label><input type="checkbox" checked={isLarge} onChange={e => {setIsLarge(e.target.checked);}}/>Use large images</label>
      <hr />
      <UpdatedList />
    </ImageSizeContext>
  )
}

function UpdatedList() {
  const listItems = places.map(place =>
    <li key={place.id}>
      <UpdatedPlace place={place} />
    </li>
  );
  return <ul>{listItems}</ul>;
}

function UpdatedPlace({ place }) {
  return (
    <>
      <UpdatedPlaceImage place={place} />
      <p><b>{place.name}</b>{': ' + place.description}</p>
    </>
  );
}

function UpdatedPlaceImage({ place }) {
    const imageSize = useContext(ImageSizeContext)
  return (<img src={getImageUrl(place)} alt={place.name} width={imageSize} height={imageSize} />);
}
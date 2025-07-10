import { useState } from "react";
import { initialTravelPlan } from "./places";

function PlaceTree({ place }) {
  const childPlaces = place.childPlaces;
  return (
    <li>
      {place.title}
      {childPlaces.length > 0 && (
        <ol>
          {childPlaces.map(place => (
            <PlaceTree key={place.id} place={place} />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const planets = plan.childPlaces;
  typeof setPlan;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planets.map(place => (
          <PlaceTree key={place.id} place={place} />
        ))}
      </ol>
    </>
  );
}

// Solution
function UpdatedPlaceTree({ id, placesById }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}{childIds.length > 0 && (
        <ol>
          {childIds.map(childId => ( <PlaceTree key={childId} id={childId} placesById={placesById} /> ))}
        </ol>
      )}
    </li>
  );
}

function UpdatedTravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const root = plan[0];

  typeof setPlan
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => ( <UpdatedPlaceTree key={id}id={id} placesById={plan} /> ))}
      </ol>
    </>
  );
}

export { UpdatedTravelPlan };

// Best solution
// Allows removal of a place easily.
function BestTravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);

  const handleComplete = (parentId, childId) => {
    const parent = plan[parentId];
    // Create a new version of the parent place
    // that doesn't include this child ID.
    const nextParent = {...parent, childIds: parent.childIds.filter(id => id !== childId)};

    // Update the root state object...
    setPlan({ ...plan, /*...so that it has the updated parent. */ [parentId]: nextParent})}

    const root = plan[0];
    const planetIds = root.childIds;
  
    return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (<BestPlaceTree key={id} id={id} parentId={0} placesById={plan} onComplete={handleComplete}/>))}
      </ol>
    </>
  );
}

function BestPlaceTree({ id, parentId, placesById, onComplete }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button onClick={() => onComplete(parentId, id)}>Complete</button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map(childId => (<BestPlaceTree key={childId} id={childId} parentId={id} placesById={placesById} onComplete={onComplete} />))}
        </ol>
      }
    </li>
  );
}

export { BestTravelPlan };
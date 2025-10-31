import { useState } from "react";
import { Letter } from "./LettersSelection";
import { initialLetters as letters } from "./data";

export default function MailClient() {
  const [selectedId, setSelectedId] = useState(null);

  // TODO: allow multiple selection
  const selectedCount = 1;

  function handleToggle(toggledId) {
    // TODO: allow multiple selection
    setSelectedId(toggledId);
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter key={letter.id} letter={letter} onToggle={handleToggle}
            isSelected={ /* TODO: allow multiple selection*/ letter.id === selectedId } />
        ))}
        <hr />
        <p><b>You selected {selectedCount} letters</b></p>
      </ul>
    </>
  );
}

function BestMailClient() {
    const [selectedIDs, setSelctedIDs] = useState([]);

    const selectedCount = selectedIDs.length;

    const handleToggle = (toggledId) => {
        // Was it previsouly selected?
        if (selectedIDs.includes(toggledId)) {
            // Then remove this from the array.
            setSelctedIDs(selectedIDs.filter(id => id !==toggledId));
        } else {
            // Otherwise add this ID to the array.
            selectedIDs([...selectedIDs, toggledId]);
        }
    }

    return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter key={letter.id} letter={letter} 
            isSelected={selectedIDs.includes(letter.id)} onToggle={handleToggle} />
        ))}
        <hr />
        <p><b> You selected {selectedCount} letters</b></p>
      </ul>
    </>
  );
}

export { BestMailClient };

// Above dode works. But for large arrays, the filter method is an expensive operation
// The filter method is called for each item replacement in the state variable
// Alt soln: use a set or map for it has the has() method
function SuperBestMailClient() {
    const [selectedIds, setSelectedIds] = useState(new Set());
    const selectedCount = selectedIds.size;

  function handleToggle(toggledId) {
    // Create a copy (to avoid mutation).
    const nextIds = new Set(selectedIds);
    if (nextIds.has(toggledId)) nextIds.delete(toggledId);
    else nextIds.add(toggledId);
    setSelectedIds(nextIds);
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter key={letter.id} letter={letter} isSelected={selectedIds.has(letter.id)} 
            onToggle={handleToggle} />
        ))}
        <hr />
        <p><b>You selected {selectedCount} letters</b></p>
      </ul>
    </>
  );
}

export { SuperBestMailClient}
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];


// State duplication
// selectedItem stores an object that lives in the itemsarray
function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  typeof setItems // Clear linter error.

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map(item => (<li key={item.id}>{item.title}{' '}
            <button onClick={() => setSelectedItem(item)}>Choose</button></li>))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}

// problem is that duplicating state leads to unexpected behavior
// if you first click “Choose” on an item and then edit it, the input updates
// but the label at the bottom does not reflect the edits.
// This is because you have duplicated state, and you forgot to update selectedItem.

function UpdatedMenu() {
    const [items, setItems] = useState(initialItems);
    const [selectedItem, setSelectedItem] = useState(items[0]);

    const handleItemChange = (id, event) => {
        setItems(items.map((item) => {
            if (item.id === id) return { ...item, title: event.target.value };
            return item;
        }));
    };

    return (
    <>
      <h2>What's your travel snack?</h2> 
      <ul>
        {items.map((item, index) => ( 
            <li key={item.id}>
                <input value={item.title} onChange={e => handleItemChange(item.id, e)}/>
                {' '}<button onClick={() => setSelectedItem(item)}>Choose</button>
                {console.log(index)}
            </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}

// Solution.
function BestMenu() {
    const [items, setItems] = useState(initialItems);
    const [selectedId, setSelectedId] = useState(0);

    const selectedItem = items.find(item => item.id === selectedId);

    const handleItemChange = (id, e) => {
        setItems(items.map(item => {
            if (item.id === id) return {...item, title: e.target.value, };
            return item;
        }));
    }

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input value={item.title} onChange={e => handleItemChange(item.id, e)}/>
            {' '}<button onClick={() => setSelectedId(item.id)}>Choose</button>
          {console.log(index)} {/*Clear linter error */}
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}

export { Menu, UpdatedMenu, BestMenu };
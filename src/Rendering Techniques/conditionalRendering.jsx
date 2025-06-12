function Item({ name, isPacked }) {
    if (isPacked) {
        return <li className="name">{name} ✅</li>
    }
    return <li className="item">{name}</li>;
}

function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}

// Conditionally returning nothing with null
// if (isPacked) {
//   return null;
// }
// return <li className="item">{name}</li>;

// Conditionally including JSX
// return (
//   <li className="item">
//     {isPacked ? name + ' ✅' : name}
//   </li>
// );

function ItemTwo({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✅'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}

function PackingListTwo() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}

// Logical AND operator (&&)
// return (
//   <li className="item">
//     {name} {isPacked && '✅'}
//   </li>
// );

// Conditionally assigning JSX to a variable.
function ItemThree({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✅";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingListThree() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}

// Challenges.


export { PackingList, PackingListTwo, PackingListThree };
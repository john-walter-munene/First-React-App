// Show an icon for incomplete items with ?
function Item ({ name, isPacked }) {
    return (
        <li className="item">{name}{ isPacked ? '✅' : ' ❌' }</li>
    );
}

function PackingList() {
    return (
        <section>
            <h1>John Hike's Packing List</h1>
            <ul>
                <Item isPacked={true} name="space suit" />
                <Item isPacked={true} name="Helmet with a golden leaf" />
                <Item isPacked={false} name="Photo of Tam" />
            </ul>
        </section>
    );
}

// Show the item importance with &&
function ItemOne({ name, importance}) {
    return (
        <li className="item">
            { name }
            { importance > 0 && ' ' }
            { importance > 0 && <i>(Importance: {importance})</i>}
        </li>
    );
}

function PackingListOne() {
    return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <ItemOne importance={9} name="Space suit" />
        <ItemOne importance={0} name="Helmet with a golden leaf" />
        <ItemOne importance={6} name="Photo of Tam" />
      </ul>
    </section>
  );
}

// Refactor a series of ? : to if and variables 
function Drink({ name }) {
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{name === 'tea' ? 'leaf' : 'bean'}</dd>
        <dt>Caffeine content</dt>
        <dd>{name === 'tea' ? '15–70 mg/cup' : '80–185 mg/cup'}</dd>
        <dt>Age</dt>
        <dd>{name === 'tea' ? '4,000+ years' : '1,000+ years'}</dd>
      </dl>
    </section>
  );
}

function RefactoredDrink({ name }) {
  if (name === 'tea') return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>leaf</dd>
        <dt>Caffeine content</dt>
        <dd>15–70 mg/cup</dd>
        <dt>Age</dt>
        <dd>4,000+ years</dd>
      </dl>
    </section>
  );
  
  return (
        <section>
            <h1>{name}</h1> 
            <dl>
              <dt>Part of plant</dt>
              <dd>bean</dd>
              <dt>Caffeine content</dt>
              <dd>80–185 mg/cup</dd>
              <dt>Age</dt>
              <dd>1,000+ years</dd>
            </dl>
        </section>
    );
}

function RefactoredDrinkTwo({ name }) {
  let part, caffeine, age;

    if (name === 'tea') {
    part = 'leaf';
    caffeine = '15–70 mg/cup';
    age = '4,000+ years';
  } else if (name === 'coffee') {
    part = 'bean';
    caffeine = '80–185 mg/cup';
    age = '1,000+ years';
  }

  return (
    <section>
      <h1>{name}</h1>
      <dt>Part of plant</dt>
      <dd>{part}</dd>
      <dt>Caffeine content</dt>
      <dd>{caffeine}</dd>
      <dt>Age</dt>
      <dd>{age}</dd>
    </section>
  );
}

function DrinkListTwo() {
  return (
    <div>
      <RefactoredDrinkTwo name="tea"/>
      <RefactoredDrinkTwo name="coffee" />
    </div>
  );
}

// If I plan to support more drinks later.
const drinks = {
  tea: {
    part: 'leaf',
    caffeine: '15–70 mg/cup',
    age: '4,000+ years'
  },
  coffee: {
    part: 'bean',
    caffeine: '80–185 mg/cup',
    age: '1,000+ years'
  }
};

function RefactoredDrinkThree({ name }) {
  const drink = drinks[name];

  if(!drink) return <div>Unknown drink: {name}</div>

  return (
    <div>
      <h1>{name}</h1>
      <dt>Part of plant</dt>
      <dd>{drink.part}</dd>
      <dt>Caffeine content</dt>
      <dd>{drink.caffeine}</dd>
      <dt>Age</dt>
      <dd>{drink.age}</dd>
    </div>
  );
}

// Extracting the JSX into a child component
function DrinkDetails({ part, caffeine, age }) {
  return (
    <dl>
      <dt>Part of plant</dt>
      <dd>{part}</dd>
      <dt>Caffeine content</dt>
      <dd>{caffeine}</dd>
      <dt>Age</dt>
      <dd>{age}</dd>
    </dl>
  );
}

function DrinkFour({ name }) {
  let part, caffeine, age;

  if (name === 'tea') {
    part = 'leaf';
    caffeine = '15–70 mg/cup';
    age = '4,000+ years';
  } else if (name === 'coffee') {
    part = 'bean';
    caffeine = '80–185 mg/cup';
    age = '1,000+ years';
  }

  return (
    <section>
      <h1>{name}</h1>
      <DrinkDetails part={part} caffeine={caffeine} age={age}/>
    </section>
  );
}

function RefactoredDrinkFour() {
  return (
    <div>
      <DrinkFour name="tea"/>
      <DrinkFour name="coffe" />
    </div>
  );
}

export { Item, PackingList, ItemOne, PackingListOne };
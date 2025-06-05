// JavaScript in JSX with Curly Braces

// Passing strings with quotes
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}

function AvatarTwo() {
    const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
    const description = "Gregorio Y. Zara";
    return (
        <img 
            className="avatar"
            src={avatar}
            alt={description}
        />
    )
}

// Using curly braces: A window into the JavaScript world

function ToDoList() {
    const name = "Gregorio Y. Zara";
    return (
        <h1>{name}'s To Do List</h1>
    )
}

const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export function TodoListTwo() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );

}

export function TodoListThree() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink',
      listStyleType: 'revert-layer'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}

const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export function TodoListFour() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
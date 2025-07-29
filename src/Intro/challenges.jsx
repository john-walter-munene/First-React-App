const person = {
  name: "Gregorio Y. Zara",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
  avatarUrl: "https://i.imgur.com/7vQD0fPs.jpg",
};

export function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img className="avatar" src={person.avatarUrl} alt="Gregorio Y. Zara" />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}


const baseUrl = 'https://i.imgur.com/';
const personNew = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export function TodoListNew() {
  return (
    <div style={personNew.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        // src = {baseUrl.concat(personNew.imageId, personNew.imageSize, '.jpg')} My first solution: works fine
        src={`${baseUrl}${personNew.imageId}${personNew.imageSize}.jpg`} // Best solution.
        alt={personNew.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}

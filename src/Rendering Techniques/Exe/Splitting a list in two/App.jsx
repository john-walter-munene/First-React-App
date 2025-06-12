import { people } from "./data";
import { getImageUrl } from "./utils";

function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}

function ListItem({ person }) {
  return (
    <li>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b> {person.profession} known for {person.accomplishment}
      </p>
    </li>
  );
}

function TwoLists() {
  const chemists = people.filter((person) => person.profession === 'chemist')
                    .map(person => <ListItem key={person.id} person={person} />);

  const otherProfessions = people.filter((person) => person.profession !== 'chemist')
                            .map(person => <ListItem key={person.id} person={person} />);

  return (
    <article>
      <h1>Chemists</h1>
      <ul>{chemists}</ul>

      <h1>Everyone Else</h1>
      <ul>{otherProfessions}</ul>
    </article>
  );
}

export { List };
import { people } from "./data";
import { getImageUrl } from "./utils";

function List() {
    const listItems = people.map((person) => {
        <li key={people.id}>
            <img src={getImageUrl(person)} 
                alt={person.name} />
            <p><b>{person.name}</b>{` ${person.profession}
                known for ${person.accomplishment}`}</p>
        </li>
    });

    return <ul>{listItems}</ul>
}

export { List };
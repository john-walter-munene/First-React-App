function getImageUrl(person, size) {
  return (`https://i.imgur.com/ ${person.imageId}${size} .jpg`);
}

function Avatar({ person, size }) {
    let sizeIdentifier;
    if (size < 90) sizeIdentifier = 's';
    else sizeIdentifier = 'b'
    
    return (<img className="avatar" src={getImageUrl(person, sizeIdentifier)} alt={person.name} width={size} height={size} />);
}

function Profile() {
  return (<Avatar size={40} person={{ name: 'Gregorio Y. Zara', imageId: '7vQD0fP' }} />);
}

export { Profile };
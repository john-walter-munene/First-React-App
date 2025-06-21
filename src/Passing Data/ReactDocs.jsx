function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}

function getImageUrl(person, size='s') {
  return (`https://i.imgur.com/' ${person.imageId} ${size} .jpg`);
}

function AvatarTwo({ person, size }) {
  return (<img className="avatar" src={getImageUrl(person)} alt={person.name} width={size} height={size} />);
}

function ProfileTwo() {
   return (
    <div>
      <Avatar size={100} person={{ name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' }} />
      <Avatar size={80} person={{ name: 'Aklilu Lemma', imageId: 'OKS67lh' }} />
      <Avatar size={50} person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }} />
    </div>
  );
}

export { ProfileTwo };

// Forwarding props with the JSX spread syntax
function ProfileThree({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <AvatarTwo person={person} size={size} isSepia={isSepia} thickBorder={thickBorder} />
    </div>
  );
}

// Above snippet is the same as 

function ProfileThreeNew(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}

// Passing JSX as children 
function getImageUrlTwo( person, size = 's') {
  return (`https://i.imgur.com/' ${person.imageId} ${size} .jpg`);
}

function AvatarFour({ person, size }) {
  return (<img className="avatar" src={getImageUrlTwo(person)} alt={person.name} width={size} height={size} />);
}

function Card({ children }) {
  return (<div className="card">{children}</div>);
}

function ProfileFour() {
  return ( <Card>
            <Avatar size={100} person={{ name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' }} />
          </Card>);
}
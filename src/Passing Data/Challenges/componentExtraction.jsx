function getImageUrl(imageId, size = 's') {
  return `https://i.imgur.com/${imageId}${size}.jpg`;
}

function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Maria Skłodowska-Curie"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            physicist and chemist
          </li>
          <li>
            <b>Awards: 4 </b> 
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
          </li>
          <li>
            <b>Discovered: </b>
            polonium (chemical element)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            geochemist
          </li>
          <li>
            <b>Awards: 2 </b> 
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li>
          <li>
            <b>Discovered: </b>
            a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}

let profiles = [
  {
    name: 'Maria Skłodowska-Curie',
    imageURLID: 'szV5sdG',
    profession: 'physicist and chemist',
    awardCount: 'Awards: 4',
    awardItem: ' (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)',
    discovery: 'polonium (chemical element)'
  },
  {
    name: 'Katsuko Saruhashi',
    imageURLID: 'YfeOqp2',
    profession: ' geochemist',
    awardCount: 'Awards: 2',
    awardItem: '(Miyake Prize for geochemistry, Tanaka Prize)',
    discovery: 'a method for measuring carbon dioxide in seawater'
  },
];

function Profile({ name, imageURLID, profession, awardCount, awardItem, discovery }) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img className="avatar" src={getImageUrl(imageURLID)} alt={name} width={70} height={70} />
      <ul>
        <li><b>Profession:</b> {profession}</li>
        <li><b>{awardCount}</b> {awardItem}</li>
        <li><b>Discovered:</b> {discovery}</li>
      </ul>
    </section>
  );
}

function PhotoShow() {
  let profileOne = profiles[0];
  let profileTwo = profiles[1];

  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile {...profileOne} />
      <Profile {...profileTwo} />
    </div>
  );
}

console.log(profiles);
export { Gallery, PhotoShow };

// Optimizing the above solution.
const newProfiles = [
  {
    name: 'Maria Skłodowska-Curie',
    imageURLID: 'szV5sdG',
    profession: 'physicist and chemist',
    awards: {
      count: 4,
      items: ['Nobel Prize in Physics', 'Nobel Prize in Chemistry', 'Davy Medal', 'Matteucci Medal']
    },
    discovery: 'polonium (chemical element)'
  },
  {
    name: 'Katsuko Saruhashi',
    imageURLID: 'YfeOqp2',
    profession: 'geochemist',
    awards: {
      count: 2,
      items: ['Miyake Prize for geochemistry', 'Tanaka Prize']
    },
    discovery: 'a method for measuring carbon dioxide in seawater'
  }
];

function NewProfile({ name, imageURLID, profession, awards, discovery }) {
    return (
    <section className="profile">
      <h2>{name}</h2>
      <img className="avatar" src={getImageUrl(imageURLID)} alt={name} width={70} height={70} />
      <ul>
        <li><b>Profession: </b>{profession}</li>
        <li><b>Awards: {awards.count}</b> ({awards.items.join(', ')})</li>
        <li><b>Discovered: </b>{discovery}</li>
      </ul>
    </section>
  );
}

function ScientistGallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      {newProfiles.map(profile => <NewProfile {...profile} key={profile.imageURLID}/>)}
    </div>
  );
}
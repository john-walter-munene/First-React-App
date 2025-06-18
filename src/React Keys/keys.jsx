import { useState } from "react";

const Item = ({ country }) => {
  // add some state to capture whether the item is active or not
  const [isActive, setIsActive] = useState(false);

  // when the button is clicked - toggle the state
  return (
    <button className={`country-item ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)}>
      <img src={country.flagUrl} />
      {country.name}
    </button>
  );
};

const CountriesList = ({ countries }) => {
    return (<div>{countries.map((country) => <Item >{country}</Item>)}</div>);
    // Essntially, the above solution has no difference with
    // countries.map((country, index) => <Item country={country} key={index} />);
};

// Arbitrary function
const orderBy = ({array, property, action}) => {
    return <ul>{action(array, property)}</ul>
};

// Why “index” as a “key” attribute is not a good idea
const CountriesListTwo = ({ countries }) => {
    // Introduce some state.
    const [sort, setSort] = useState('asc');

    // Sort countries based on state value with lodash orderBy function
    const sortedCountries = orderBy(countries, 'name', sort);

    // Add button that toggles state between 'asc' and 'desc'
    const button = <button onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}>toggle sorting: {sort}</button>

    return (<div>{button}{sortedCountries.map(country => <Item country={country}></Item>)}</div>);
}

export { CountriesList, CountriesListTwo };
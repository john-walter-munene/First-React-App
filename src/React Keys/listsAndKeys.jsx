function NumbersList(props) {
    const numbers = props.numbers;

    const listItems = numbers.map(number => <li key={number.toString()}>{number}</li>);

    return (<ul>{listItems}</ul>);
}

export { NumbersList };
// Strategies for Optimizing ReactJS Reconciliation
// 1. Use shouldComponentUpdate
function shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState);
    return nextProps.someValue !== this.props.someValue;
}

// 2. Use React.memo
const MyComponent = React.memo(function MyComponent(props) {
    console.log(props)
});

// 3. Use key Prop Efficiently in Lists
const items = [1, 2, 3, 4];
const listItems = items.map(item => <li key={item}>{item}</li>);

// 4. Avoid Inline Functions and Objects in JSX
// Inefficient
<MyComponent onClick={() => doSomething()} />

// Efficient
const handleClick = useCallback(() => doSomething(), []);
<MyComponent onClick={handleClick} />

// Use React.PureComponent
class MyComponentTwo extends React.PureComponent {
  render() {
    return <div>{this.props.someValue}</div>;
  }
}

export { shouldComponentUpdate, MyComponentTwo, MyComponent, listItems };

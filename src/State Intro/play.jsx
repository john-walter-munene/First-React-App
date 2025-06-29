// Inefficient
<MyComponent onClick={() => doSomething()} />

// Efficient
const handleClick = useCallback(() => doSomething(), []);
<MyComponent onClick={handleClick} />

// My way of fixing Inefficent: Curryed functions
const doSomethingTwo = (e) => () => {/*Does stuff*/console.log(e)}
<MyComponent onClick={doSomethingTwo} />


import React from "react";

function CandyDispenser() {
	const initialCandies = ['snickers', 'skittles', 'twix', 'milky way'];
	const [candies, setCandies] = React.useState(initialCandies);

	const dispense = (candy) => setCandies((allCandies) => allCandies.filter((c) => c !== candy));

	return (
		<div>
			<h1>Candy Dispenser</h1>
			<div>
				<div>Available Candy</div>
				{candies.length === 0 ? (<button onClick={() => setCandies(initialCandies)}>refill</button>) :
                    (<ul>{candies.map((candy) => (<li key={candy}><button onClick={() => dispense(candy)}>grab</button> {candy}</li>))}</ul>)}
			</div>
		</div>
	)
}

export { CandyDispenser };

// // Referential equality
// true === true // true
// false === false // true
// 1 === 1 // true
// 'a' === 'a' // true

// {} === {} // false
// [] === [] // false
// (() => {}) === (() => {}) // false

// const z = {}
// z === z // true

// NOTE: React actually uses Object.is, but it's very similar to ===

// Dependencies lists

function buzz(options) {
    console.log(`Doing stuff with ${options}`)
}

function Foo({ bar, baz }) {
	const options = { bar, baz };

	React.useEffect(() => {
		buzz(options)
	}, [options]) // we want this to re-run if bar or baz change
	return <div>foobar</div>
}

function Blub() {
	return <Foo bar="bar value" baz={3} />
}

// Above code will always re rernder as options will be new every time component rerenders.
// Soln...

// option 1
function FooTwo({ bar, baz }) {
    React.useEffect(() => {
        const options = { bar, baz };
        buzz(options);
    }, [bar, baz]);

    return <div>foobar</div>;
}

// Above code is a great option, but there's a situation when it isn't a practical solution.
// This is if bar or baz are (non-primitive) objects/arrays/functions

function BlubTwo() {
    const bar = () => {};
    const baz = [1, 2, 3];
    return <Foo bar={bar} baz={baz} />
}

// This is precisely the reason why useCallback and useMemo exist. So here's how you'd fix that (all together now):

function SuperFoo({ bar, baz }) {
    React.useEffect(() => {
        const options = { bar, baz };
        buzz(options);
    }, [bar, baz]);

    return <div>foobar</div>;
}

function SuperBlub() {
    const bar = React.useCallback(() => {}, []);
    const baz = React.useMemo(() => [1, 2, 3], []);
    return <SuperFoo bar={bar} baz={baz} />
}

export { SuperBlub };

// React.memo (and friends)
function CountButton({ onClick, count }) {
	return <button onClick={onClick}>{count}</button>
}

function DualCounter() {
	const [count1, setCount1] = React.useState(0)
	const increment1 = () => setCount1((c) => c + 1)

	const [count2, setCount2] = React.useState(0)
	const increment2 = () => setCount2((c) => c + 1)

	return (
		<>
			<CountButton count={count1} onClick={increment1} />
			<CountButton count={count2} onClick={increment2} />
		</>
	)
}

// Note: MOST OF THE TIME YOU SHOULD NOT BOTHER OPTIMIZING UNNECESSARY RERENDERS. 

const CountButtonTwo = React.memo(function CountButton({ onClick, count }) {
	return <button onClick={onClick}>{count}</button>;
})

function DualCounterTwo() {
	const [count1, setCount1] = React.useState(0)
	const increment1 = React.useCallback(() => setCount1((c) => c + 1), []);

	const [count2, setCount2] = React.useState(0)
	const increment2 = React.useCallback(() => setCount2((c) => c + 1), []);

	return (
		<>
			<CountButtonTwo count={count1} onClick={increment1} />
			<CountButtonTwo count={count2} onClick={increment2} />
		</>
	);
}

// Computationally expensive calculations
function calculatePrimes(iterations, multiplier) { console.log(`Doing stuff with ${iterations} and ${multiplier}`) };

function RenderPrimes({ iterations, multiplier }) {
	const primes = calculatePrimes(iterations, multiplier);
	return <div>Primes! {primes}</div>;
}

function UpdatedRenderPrimes({ iterations, multiplier }) {
    const primes = React.useMemo(() => calculatePrimes(iterations, multiplier), [iterations, multiplier]);

    return <div>Primes: {primes}</div>;
}
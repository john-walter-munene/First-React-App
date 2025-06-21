// Syntax
// const [a, b] = array;
// const [a, , b] = array;
// const [a = aDefault, b] = array;
// const [a, b, ...rest] = array;
// const [a, , b, ...rest] = array;
// const [a, b, ...{ pop, push }] = array;
// const [a, b, ...[c, d]] = array;

// const { a, b } = obj;
// const { a: a1, b: b1 } = obj;
// const { a: a1 = aDefault, b = bDefault } = obj;
// const { a, b, ...rest } = obj;
// const { a: a1, b: b1, ...rest } = obj;
// const { [key]: a } = obj;

// let a, b, a1, b1, c, d, rest, pop, push;
// [a, b] = array;
// [a, , b] = array;
// [a = aDefault, b] = array;
// [a, b, ...rest] = array;
// [a, , b, ...rest] = array;
// [a, b, ...{ pop, push }] = array;
// [a, b, ...[c, d]] = array;

// ({ a, b } = obj); // parentheses are required
// ({ a: a1, b: b1 } = obj);
// ({ a: a1 = aDefault, b = bDefault } = obj);
// ({ a, b, ...rest } = obj);
// ({ a: a1, b: b1, ...rest } = obj);

// Examples
// Array destructuring
// Basic variable assignment
const foo = ["One", "Two", "Three"];

const [ red, yellow, green ] = foo;
console.log(red, yellow, green);

// Destructuring with more elements than the source
const fooTwo = ["one", "two"];
const [redTwo, yellowTwo, greenTwo, blueTwo] = fooTwo;
console.log(redTwo) // one
console.log(yellowTwo) // two
console.log(greenTwo) // undefined
console.log(blueTwo) // undefined

// Swapping variables
let a = 1, b = 3;

[a, b] = [b, a];
console.log(a) // 3
console.log(b) // 1

const array = [1, 2, 3];
[array[2], array[1]] = [array[1], array[2]];
console.log(array) // [1, 3, 2]

// Parsing an array returned from a function
function f() {
    return [1, 2];
}

const [ valueOne, valueTwo ] = f();
console.log(valueOne) // 1
console.log(valueTwo) // 2

// Ignoring some returned values
function f2() {
    return [1, 2, 3];
}

const [itemOne, , itemTwo] = f2();
console.log(itemOne); // 1
console.log(itemTwo); // 3

// Using a binding pattern as the rest property
const [aee, bee, cee, dee] = [1, 2, 3, 4];
console.log(aee, bee, cee, dee) // 1, 2, 3, 4

// Unpacking values from a regular expression match
function parseProtocol(url) {
  const parsedURL = /^(\w+):\/\/([^/]+)\/(.*)$/.exec(url);
  if (!parsedURL) {
    return false;
  }
  console.log(parsedURL);
  // ["https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  // "https", "developer.mozilla.org", "en-US/docs/Web/JavaScript"]

  const [, protocol, fullHost, fullPath] = parsedURL;
  console.log(fullHost, fullPath);
  return protocol;
}

console.log(parseProtocol("https://developer.mozilla.org/en-US/docs/Web/JavaScript"),); // "https"

// Using array destructuring on any iterable
const [arrOne, arrTwo] = new Map([1, 2], [3, 4]);
console.log(arrOne) // [1, 2]
console.log(arrTwo) // [3, 4]

const obj = {
  *[Symbol.iterator]() {
    for (const v of [0, 1, 2, 3]) {
      console.log(v);
      yield v;
    }
  },
};

const [a1, b1, ...rest] = obj; // Logs 0 1 2 3
console.log(a1, b1) // 0 and 1
console.log(rest); // [2, 3] (an array)
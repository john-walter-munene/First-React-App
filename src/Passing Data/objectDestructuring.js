// Basic assignment

const user = {
  id: 42,
  isVerified: true,
};

const { id, isVerified } = user;

console.log(id); // 42
console.log(isVerified); // true

// Assigning to new variable names
const o = { p: 42, q: true };
const { p: foo, q: bar } = o;

console.log(foo); // 42
console.log(bar); // true

// Assigning to new variable names and providing default values
// A property can be both
// Unpacked from an object and assigned to a variable with a different name
// Assigned a default value in case the unpacked value is undefined

const { a: aa = 10, b: bb = 5 } = { a: 3 };

console.log(aa); // 3
console.log(bb); // 5

// Unpacking properties from objects passed as a function parameter
const userTwo = {
  id: 42,
  displayName: "jdoe",
  fullName: {
    firstName: "Jane",
    lastName: "Doe",
  },
};

function userId({ id }) {
    return id;
}

console.log(userId(userTwo)) // 42

// Defining the name of the unpacked value
const  userDisplayName = ({ displayName: dName }) =>  dName;

console.log(userDisplayName(userTwo)) // jdoe

function whoIs({ displayName, fullName: { firstName: name }}) {
    return `${displayName} is ${name}`
}

console.log(whoIs(userTwo)) // jdoe is Jane

// Setting a function parameter's default value
function drawChart({ size = "big", coords = { x: 0, y: 0 }, radius = 25, } = {}) {
  console.log(size, coords, radius);
  // do some chart drawing
}

drawChart({ coords: { x: 18, y: 30 }, radius: 30, });

// Nested object and array destructuring
const metadata = {
  title: "Scratchpad",
  translations: [
    {
      locale: "de",
      localizationTags: [],
      lastEdit: "2014-04-14T08:43:37",
      url: "/de/docs/Tools/Scratchpad",
      title: "JavaScript-Umgebung",
    },
  ],
  url: "/en-US/docs/Tools/Scratchpad",
};

const {
  title: englishTitle, // rename
  translations: [
    {
      title: localeTitle, // rename
    },
  ],
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle); // "JavaScript-Umgebung"

// For of iteration and destructuring
const people = [
  {
    name: "Mike Smith",
    family: {
      mother: "Jane Smith",
      father: "Harry Smith",
      sister: "Samantha Smith",
    },
    age: 35,
  },
  {
    name: "Tom Jones",
    family: {
      mother: "Norah Jones",
      father: "Richard Jones",
      brother: "Howard Jones",
    },
    age: 25,
  },
];

for (const {
  name: n,
  family: { father: f },
} of people) {
  console.log(`Name: ${n}, Father: ${f}`);
}

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"


// Computed object property names and destructuring
const key = "z";
const { [key]: fooN } = { z: "bar" };

console.log(fooN); // "bar"

// Invalid JavaScript identifier as a property name
const fooTwo = { "fizz-buzz": true };
const { "fizz-buzz": fizzBuzz } = fooTwo;

console.log(fizzBuzz); // true


// Destructuring primitive values
const { a, toFixed } = 1;
console.log(a, toFixed); // undefined ƒ toFixed() { [native code] }

// Combined array and object destructuring
const props = [
  { id: 1, name: "Fizz" },
  { id: 2, name: "Buzz" },
  { id: 3, name: "FizzBuzz" },
];

const [, , { name }] = props;

console.log(name); // "FizzBuzz"

// The prototype chain is looked up when the object is deconstructed
const obj = {
  self: "123",
  __proto__: {
    prot: "456",
  },
};
const { self, prot } = obj;

console.log(self); // "123"
console.log(prot); // "456"
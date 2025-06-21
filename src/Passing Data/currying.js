function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curryedSum = curry(sum);

console.log( curryedSum(1)(2) ); // 3

// What is currying for?
function log(date, importance, message) {
  console.log(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

let curryedLog = curry(log);

curryedLog(new Date(), "DEBUG", "some debug"); // log(a, b, c)
curryedLog(new Date())("DEBUG")("some debug"); // log(a)(b)(c)

// logNow will be the partial of log with fixed first argument
let logNow = curryedLog(new Date());

// use it
logNow("INFO", "message"); // [HH:mm] INFO message

let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message

function curryNew(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}

function sumNew(a, b, c) {
  return a + b + c;
}

let curriedSum = curryNew(sumNew);

console.log( curriedSum(1, 2, 3) ); // 6, still callable normally
console.log( curriedSum(1)(2,3) ); // 6, currying of 1st arg
console.log( curriedSum(1)(2)(3) ); // 6, full currying

// 🛒 Real-World Scenario: E-commerce Checkout Flow
// Curried function to progressively compute the final price
const calculateInvoice = (cartItems) => (shippingInfo) => (paymentMethod) => {
  // You now have all the data to finalize computation
  const baseTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingFee = shippingInfo.zone === "remote" ? 10 : 5;
  const discount = paymentMethod === "storeCard" ? 0.1 : 0;

  const total = (baseTotal + shippingFee) * (1 - discount);

  return {
    baseTotal,
    shippingFee,
    discount: discount * 100 + "%",
    finalTotal: total.toFixed(2),
  };
};

// Step 1: User adds items to cart
const step1 = calculateInvoice([
  { name: "Laptop", price: 1000, qty: 1 },
  { name: "Mouse", price: 50, qty: 2 }
]);

// Step 2: User provides shipping info
const step2 = step1({ zone: "remote" });

// Step 3: User selects payment method
const finalResult = step2("storeCard");

console.log(finalResult);
/*
{
  baseTotal: 1100,
  shippingFee: 10,
  discount: '10%',
  finalTotal: '999.00'
}
*/

// Example variation: In a dynamic setup in ecommerce
let cartItems = [];

// ✅ Add item
function addToCart(item) {
  cartItems.push(item);
}

// ❌ Remove item
function removeFromCart(itemName) {
  cartItems = cartItems.filter(i => i.name !== itemName);
}

// 🛒 Checkout curry
const checkout = (shippingInfo) => (paymentMethod) => {
  const baseTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingFee = shippingInfo.zone === "remote" ? 10 : 5;
  const discount = paymentMethod === "storeCard" ? 0.1 : 0;

  const total = (baseTotal + shippingFee) * (1 - discount);

  return {
    baseTotal,
    shippingFee,
    discount: discount * 100 + "%",
    finalTotal: total.toFixed(2),
  };
};

// Example flow
addToCart({ name: "Laptop", price: 1000, qty: 1 });
addToCart({ name: "Mouse", price: 50, qty: 2 });
removeFromCart("Mouse");

const stepOne = checkout({ zone: "remote" });
const result = stepOne("storeCard");

console.log(result);
/*
{
  baseTotal: 1000,
  shippingFee: 10,
  discount: '10%',
  finalTotal: '909.00'
}
*/


// Other Real-World Use Cases:
// Form Builders / Wizards:
// User fills in a multi-step form → validate and build data as they go.

// Event Tracking / Analytics:
// Collect context progressively → send final event once all is collected.

// Dynamic UI Components:
// Curry config functions for styling, behaviors, or permissions over time.

// Chatbot / Survey Systems:
// Collect responses step-by-step → evaluate result at the end.


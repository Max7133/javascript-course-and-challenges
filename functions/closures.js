'use strict';

////////////////////////////////////////////////   C L O S U R E S   ///////////////////////////////////////////////////////////

const secureBooking = function () {
  let passengerCount = 0;
  // Returns a New Function
  return function () {
    passengerCount++; // that updates the passengerCount Variable (the Variable defined in the secureBooking parent Function)
    console.log(`${passengerCount} passengers`);
  };
};
// Calling the secureBooking Function and storing the result in a Variable 'Booker'
const booker = secureBooking();
// Calling the booker Function 3 times
booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers
// I called it 3 times, but How Is That Even Possible ?
// How can the 'booker' Function update the passengerCount Variable that's defined in a secureBooking Function, that has already finished executing ?
// secureBooking Function already finished its execution, it is gone, so its Execution Context is no longer on the Stack
// but still this Inner Function (return Function()) which is the 'booker' Function is still able to access the passengerCount Variable, that's inside of the 'booker' Function, that should no longer exist
// the reason for that is CLOSURE
// We can say a CLOSURE makes a Function remember all the variable that existed at the Function's Birthplace (secureBooking = function(){...}) of the 'booker' Function essentially (return function(){...})

// IT WORKS BECAUSE ANY FUNCTION ALWAYS HAS ACCESS TO THE VARIABLE ENVIRONMENT OF THE EXECUTION CONTEXT IN WHICH THE FUNCTION WAS CREATED
// In case of 'booker', this Function was created(born) in the Execution Context of the secureBooking function, which popped off the Stack,
// thefore the 'booker' Function will get access to this Variable environment (return function(){...} which contains the passengerCount Variable)
// And this is how the Function will be able to READ and MANIPULATE the passengerCount Variable. (This connection called CLOSURE !)
// CLOSURE has Priority over the Scope Chain, it will first try to look for the Variable there.
// We cannot directly access Closure Variables, this is something that happens by JS automatically
// However, we can do is to actually take a look at this Internal Property in the Console
console.dir(booker);
// Double brackets like in [[Scopes]] means that it is Internal Property which we cannot access from our code.

/////// Creating 2 more situations, in which CLOSURES are gonna appear /////
//BOTH of these examples are gonna show that we DON'T NEED to RETURN a Function from another Function in order to create a Closure.

//// Example 1 (defining an empty Variable 'f', and a Function Expression 'g')

let f;

const g = function () {
  const a = 23;
  // reassign the 'f' Variable
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  // reassign the 'f' Variable AGAIN
  f = function () {
    console.log(b * 2);
  };
};

g(); // even though 'g' Function has finished it execution and is now gone, but 'f' Closed over that Variable environment and now it has it in CLOSURE
f(); // 46 (This proves is that 'f' Value (f = function () {...}) really does close over any Variables of the Execution Context in which it was defined
// And that is TRUE even when the Variable itself (let f) was technically not even defined inside,
// it was defined (created) Outside in the Global Scope, but then as I assinged a (f = function () {...} in the 'g' Function) as it still closed over the Variable environment of the 'g' Function
// And that includes (const a = 23 Variable) therefore it is able to access this 'a' Variable even after the 'g' Function at the end of the code, has ofcourse already finished its Execution
console.dir; // Closure Value 'a' (ONLY)

h();
f(); // 1554 This F is a different one
// inspecting the Variable Environment of f()
// in the Closure now it has the Value of 'b' and it now no longer has the value of 'a'.
// the OLD CLOSURE DISSAPEARS with 'a' Value
console.dir; // Closure Value 'b' (ONLY)

//// Example 2 (Timer) good Example that we don't need to return a Function to see a Closure in action.
const boardPassengers = function (n, wait) {
  const perGroup = n / 3; // dividing number of passengers by 3 groups
  // Using a Timer is a setTimeout function needs 2 parameters
  // First Argument is a Function which will be executed after a certain time
  // Second Argument 1000 milliseconds (means whatever code inside this Function, will be executed after 1 second)
  // This setTimeout callback Function was executed completely independently from the boardPassengers Function
  // but still setTimeout callback Fuction was able to use all the Variables that were in the Variable Environment in which it was created. setTimeout(function () {'n'...'perGroup'})
  // The only way in which setTimeout c.b. Function has access to Variables that are defined in boardPassengers Function, that has long finished execution is, if it created a CLOSURE.
  // The Closure also includes the Arguments, because they are really just Local Variables in the Function
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    // wait * 1000 because I gonna pass into 'wait' in seconds
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

// Prove that the Closure have priority over the Scope Chain, while creating another perGroup Variable in the Global Scope
const perGroup = 1000; // tested, it didn't use this second perGroup Variable, because the Closure have priority over the Scope Chain

boardPassengers(180, 3);

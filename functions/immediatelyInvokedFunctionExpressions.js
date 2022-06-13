'use strict';

//////////////////////////////////  I m m e d i a t e l y   I n v o k e d   F u n c t i o n   E x p r e s s i o n s ///////////////////////////////////////////////

// In short IIFE
// We need a Function that is going to only executed once, and then never again, basically a Function that disappears right after its called once (we need it with 'async' & 'await')

// How to do it ? Is creating a Function and only execute it once.

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();
// However I could run it again, at some other point in the code if I wanted to.
// This is wrong!

// This is I want to do (I want to actually execute a Function immediately and not even having to save it somewhere).
/* function() {
    console.log('This will never run again'); // will give Function statements require a Function name
} */

// To Fix it, I just need to wrap it with parentheses
// Now this Statement is transformed into Expression
// IIFE
(function () {
  console.log('This will never run again'); // this will give Function statements require a Function name ERROR
  const isPrivate = 23;
})();
// Now the error is gone, but the Function didn't execute yet, to call it I need just to add () at the end.

// IIFE (with Arrow Function)

(() => console.log('This arrow function will never run arain'))();

// Why is IIFE a thing?
// Functions create Scopes, what is important is that 1 Scope does NOT have access to Variables from an Inner Scope
// Example here in the Global Scope I don't have access to ANY Variables that are defined in the Scope of any of these Functions.
// Code example Variable isPrivate won't execute
// console.log(isPrivate); // isPrivate is NOT defined (because the Scope chain only works the other way around)
// so the Inner scope would have access to anything defined OUTSIDE here in the Global Scope, but the other way around the Global Scope does not have access to Anything that is inside of the Scope.
// Therefore, we say that all data defined INSIDE the Scope is PRIVATE (ENCAPSULATED)
// Example: isPrivate is ENCAPSULATED inside the Function Scope
// It is IMPORTANT to HIDE Variables and Scopes are good tool for doing this, that's why we need IIFE.

// In ES6 Varibles declared with Const or Let, create their own Scope inside a block
// Example: When we create a block like this, and declare isPrivate in there
{
  const isPrivate = 23;
  // Will be accesable (VAR ignores it, that's why in MODERN JavaScript IIFE are not that commonly used anymore)
  // If we needed a new Scope for Data privacy, all we need to do is to just create a Block like this, no need to create a Function to create a new Scope.
  // But if I want to execute the Function just once then IIFE is good solution for that even with MODERN JavaScript.
  var notPrivate = 23;
}
// Then the outside STILL cant access it isPrivate
// console.log(isPrivate); // isPrivate is NOT defined
console.log(notPrivate); // 23

'use strict';

//////////////////////////////////////////////////////   T H E   F I L T E R   M E T H O D   //////////////////////////////////////////////////////
// The Filter Method needs a Callback Function
// Same like in Map, forEach, the 1st Element is the Current Array Element, 2nd Index, 3rd the Entire Array
// In Filter Method we usually only need the Current Array Element 'mov'

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Creating an Array of 'deposits' ('deposits' are only the 'movements' that are above 0)
const deposits = movements.filter(function (mov) {
  return mov > 0; // It will filter out the Negative Values, so in this condition the only Values that PASSED the it, will then make it into the New Array.
});
console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(deposits); // (5) [200, 450, 3000, 70, 1300]

// SAME EXAMPLE with for of loop

// Need an Empty Array for pushing Each Element here
const depositsFor = [];

for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor); // (5) [200, 450, 3000, 70, 1300]

// The DIFFERENCE between the for of and Filter Method is that the push() that exist in JavaScript for usinf more Function Code, like 'const deposits' EXAMPLE
// Also we can Chain All these Methods together, using them one after another, to build a big final result. (with for of loop it is IMPOSSIBLE)

// MINI CHALLENGE, create an Array only with NEGATIVE Values
const withdrawals = movements.filter(mov => mov <= 0);
console.log(withdrawals); // (3) [-400, -650, -130]

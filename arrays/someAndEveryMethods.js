'use strict';

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//////////////////////////////////////////////////////   S O M E   A N D   E V E R Y   M E T H O D S   //////////////////////////////////////////////////////
// Some Method
// If there is any Value for which a certain condition is true, then the Some Method will return true.

console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]

// EQUALITY
// Includes Method Example (if the Array includes a certain Value)
// This is essentially testing for equality
console.log(movements.includes(-130)); // true

// SOME: CONDITION
console.log(movements.some(mov => mov === -130)); // true
// Some Method Example (for testing a condition)
// I would like to know if there has been any deposits on this account. (positive movement in this Array, above 0)
// Callback Function which has to Return True or False
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); // true

// Every Method
// Every Method is similiar to the Some Method, the difference between them is that Every Method ONLY returns true if ALL of the Elements in the Array satisfy the Condition that we pass in.
// If Every Element passes the test in the Callback Function only then the Every Method returns TRUE
console.log(movements.every(mov => mov > 0)); // false
//console.log(account4.movements.every(mov => mov > 0)); // true

// We have always written the Callback Function directly as an argument into our Array Methods
// We could also write this Function separately and THEN pass the Function as a callback

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit)); // true
// And now we can REUSE the Same Function in the different Methods that require callbacks with a true/false condition
console.log(movements.every(deposit)); // false
console.log(movements.filter(deposit)); // (5) [200, 450, 3000, 70, 1300]

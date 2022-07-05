'use strict';

//////////////////////////////////////////////////////   T H E   F L A T   A N D   T H E   F L A T M A P   M E T H O D S   //////////////////////////////////////////////////////

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Array that has Arrays in it (Nested Array)
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// Separating Elements and putting them into 1 single Array with the Flat Method
console.log(arr.flat()); // (8) [1, 2, 3, 4, 5, 6, 7, 8]

// Array that is even deeper nested
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// The Flat Method only goes 1 level deep in the Nested Array
console.log(arrDeep.flat()); // (6) [Array(2), 3, 4, Array(2), 7, 8]
// If I want the Flat Method go 2 levels deep
console.log(arrDeep.flat(2)); // (8) [1, 2, 3, 4, 5, 6, 7, 8]

// Bank wants to calculate the overall balance of all the 'movemenets' of all the accounts.
// 'movements' are stored in Arrays, and these Arrays are inside the Objects in the 'accounts' Array
// 1st ill take all the 'movements' from the 'accounts' Array and put them all into 1 Array
// Creating New Array but with the same length, which only contains these 'movements' Array
/* const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements); // (4) [Array(8), Array(8), Array(8), Array(5)]

// Now I want the Array containing all of these 'movemenets' Values just in 1 Array
// Withous any Parameters, because by default its 1 level of Nesting
const allMovements = accountMovements.flat();
console.log(allMovements); // (29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]

// Adding all 'movements' together
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0); */

// flat
// Same thing but with CHAINING METHODS
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance); // 17840

// Using the Map Method and then the Flat Method is pretty common thing, that's why there is a Flatmap Method
// The flatMap Method combines the Map and the Flat Method into 1 method, which is better for performance.

// flatMap
// Since flatMap Method also uses mapping, it needs to receive EXACTLY THE SAME CALLBACK AS THE MAP METHOD
// flatMap can ONLY GO 1 LEVEL DEEP AND WE CAN'T CHANGE IT
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2); // 17840

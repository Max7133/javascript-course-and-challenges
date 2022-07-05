'use strict';

//////////////////////////////////////////////////////   T H E   S O R T   M E T H O D   //////////////////////////////////////////////////////
// Mutates the Original Array !!!

// With Strings
const owners = ['Vitas', 'Robert', 'Thomas', 'Max'];
// Now the Array is Alphabetically sorted (ALSO MUTATES ORIGINAL ARRAY)
console.log(owners.sort()); // (4) ['Max', 'Robert', 'Thomas', 'Vitas']

// With Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// The numbers aren't sorted properly, because the Sort Method does the sorting based on Strings!
// If this result were Strings, it would make sence, but it's Not Strings
// console.log(movements.sort()); // (8) [-130, -400, -650, 1300, 200, 3000, 450, 70]

// With Numbers (FIX)
// By passing in a compare Callback Function in the Sort Method
// This Callback Function is called with 2 Arguments (Current Value, Next Value)
// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
// ASCENDING
// movements.sort((a, b) => {
//   if (a > b) return 1; // Number dosen't really mather, as long as it is > 0
//   if (b > a) return -1; // Something Negative
// });
movements.sort((a, b) => a - b);

console.log(movements); // (8) [-650, -400, -130, 70, 200, 450, 1300, 3000]

// DESCENDING
// movements.sort((a, b) => {
//   if (a > b) return -899898922298; // random return number, as long as it is < 0
//   if (b > a) return 1287898793; // random return number, as long as it is > 0
// });
movements.sort((a, b) => b - a);
console.log(movements); // (8) [3000, 1300, 450, 200, 70, -130, -400, -650]

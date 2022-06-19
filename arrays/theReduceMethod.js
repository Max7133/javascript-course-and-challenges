'use strict';

//////////////////////////////////////////////////////   T H E   R E D U C E   M E T H O D   //////////////////////////////////////////////////////
// The Reduce Method is to essentially combine all the Elements in an Array in to 1 Single Value
// The Reduce Method also gets a Callback Function
// The 1st Parameter in the Callback Function of the Reduce Method is 'accumulator' (its like a snowball, that keeps Accumulating the Value)
// All the rest are like in the Map Method, Filter Method and forEach Method
// 2nd The Current Element of the Array, 3rd The Current Index, 4th The Whole Array
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// 1st Argument of the Reduce Method is the (function (acc, cur, i, arr)
// 2nd Argument (Parameter) is the Initial Value of the Accumulator (after return) }, 0); // Starts from 0
/* const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`); // (JUST FOR CHECKING) Iteration 0: 0, Iteration 1: 200 etc....
  // This Callback Function will be called in Each Iteration of a looping over the Array
  // So Reduce Method, also loops over the Array and calls this Callback in Each Iteration
  // I'm going to ADD the Current Value to the Accumulator Parameter
  // This will work because in Each call of the Callback Function, the accumulator will be the Current Sum of all the previous values.
  // Finally, I will also return this Value here from the Callback Function. This is how the 'accumulator' can Then be used in the Next Iteration of the loop.
  return acc + cur;
}, 0); */

// SAME WITH ARROW FUNCTION
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

// SAME EXAMPLE with the for loop
// I need an External Variable for this
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

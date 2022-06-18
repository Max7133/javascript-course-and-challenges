'use strict';

//////////////////////////////////////////////////////   T H E   M A P   M E T H O D   //////////////////////////////////////////////////////

// unlike forEach, the Map Method will give us a new Array
// and this new Array will contain in each position the results of applying a Callback Function to the Original Array Elements.
// the Map won't change (mutate) the Original Array, it only returns a New Array with the New Elements

// Suppose these 'movements' are in Euros (1EUR = 1.1 USD)
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Converting them ('movements') to US dollars
const eurToUsd = 1.1;
// Now I want to multiply Each Element of the 'movements' Array by 1.1
// Like in forEach, in Map I need a Callback Function
// for Arguments like the forEach the first Argument is the Current Array Element
// Since Map Method returns a New Array, I will store it in a Variable

// const movementsUSD = movements.map(mov => mov * eurToUsd);
// Same NON Arrow Function below

const movementsUSD = movements.map(function (mov) {
  // In the Callback Function I need to return the Value that I want the New Array to have in the Current Position
  // In this case, I want the Original Array * the Euro to USD conversion rate.
  return mov * eurToUsd;
  // if I just return 23; // (8) [23, 23, 23, 23, 23, 23, 23, 23]
});
console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movementsUSD); // (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

// same Example but with forOff loop
// in this loop I want to create a New Array
// first I need to create and define that New Empty Array
const movementsUSDfor = [];
// then I loop over 'movements' Array, it will keep pushing a Value to the New 'movementsUSDfor' Array
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// the Output will look Exactly the same like in Map
console.log(movementsUSDfor); // (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

// The DIFFERENCE is:
// In Map Method I used a function in order to create a New Array
// in forOf I just loop over 1 Array and the Manually create a New Array
// THEREFORE in Modern JavaScript like for example the Map Method, is the way to go
// using methods together with Callback Functions like this, is the New and Modern way of doing stuff.

// Like forEach Method, the Map Method also Has access to the EXACT SAME THREE PARAMETERS (ARGUMETNS)
// They are:
// Current Array Element (in my example 'mov')
// Current Index
// The WHOLE Array

// Using the Map Method to loop AGAIN over the 'movements' Array,
// but this time I will create a String similar, to the one that I printed to the Console.log using the forEach Method earlier
// Also with Arrow Function this time
/* const movementsDescriptions = movements.map((mov, i, arr) => {
  // I want to return the String, so that it then gets put into the New Array, that results from the Map Method.
  if (mov > 0) {
    // It's completely acceptable to have 2 RETURN STATEMENTS (OR MORE) IN THE SAME FUNCTION, AS LONG AS ONLY 1 OF THEM IS EXECUTED
    // In this Example it's either First One gets Executed, either Second One get Executed, it's IMPOSIBLE for BOTH of them to RETURN AT THE SAME TIME
    return `Movement ${i + 1}: You deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  }
}); */

// EVEN SHORTER VERSION OF THE UPPER 'movementsDescriptions' Arrow Function
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions); // (8) ['Movement 1: You deposited 200', 'Movement 2: You deposited 450', 'Movement 3: You withdrew 400', 'Movement 4: You deposited 3000', 'Movement 5: You withdrew 650', 'Movement 6: You withdrew 130', 'Movement 7: You deposited 70', 'Movement 8: You deposited 1300']

// All I did is that I have passed the Callback Function into the Map Method
// I didn't call the Callback Function myself, the Map Method is who will call this Callback Function for each of the Array Elements in the 'movement' Array
// Each time that the Map Method Calls or Callback, it will simply Pass in the Current Array Element as well as the Current Index and The Whole Array.
// Of those 3 Arguments, I only used 2 ('mov', 'i') Current Element, Current Index

// Another BIG difference
// comparing the same thing I did with the forEach Method and Map Method is...
// Before with forEach I printed each line INDIVIDUALLY to the Console, as I was looping over the Array, in each of the Iterations, it performed some Action that was then visible in the Console.
// I Can call that a Side Effect, so the forEach Method created Side Effects

// Now with the Map Method, all I did was to Return Each of the Strings from the Callback Function.
// So basically they got added into a New Array
// And then finally I logged that ENTIRE Array to the Console and not the Elements one by one.
// So here in this Map Method, I did't create a Side Effect in each of the Iteration
// All I did was to build a New Array.

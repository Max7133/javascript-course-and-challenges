'use strict';

/////////////////////////////////  F O R   E A C H   O N   A R R A Y S  ///////////////////////////////////////////////////

// I want to loop over this Array, in order to print a message for Each movement in this bank account.
// positive Value = deposits, negative Value = withdrawals
// I can print something whether the use Deposited or Withdrew some money
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// with For Off Loop
// for (const movement of movements) {

// What if we actually needed access to a Counter Variable here, just like we can access the Current Index of the Array here in the For Of Loop
// In this case I loop over movements.entries()
// entries() is just another Array Method that returns Array of Arrays, which in the first position contains the Current Index [i] and then the Value itself 'movement'
// in For Off Loop while using entries() the 1st Element 'i' is the Index, 2nd Value is the Current Array Element
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    // number of the movement ${i + 1}
    console.log(`Movement ${i + 1}: You deposited ${movement}`); // Movement 1: You deposited 200
  } else {
    // Math.absis so I can take the Absolute Value, so basically removing the sign.
    // with Math.abs You withdrew 400, without Math.abs You withdrew -400
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`); // Movement 3: You withdrew 400
  }
}
console.log('--- FOR EACH ---');
// with forEach Loop
// forEach is technically a Higher Order Function which requires a Callback Function in order to tell it what to do.
// so it's the forEach Method that will call this Callback Function, we are not calling it ourselves as always.
// forEach Method loops over the Array, and in each iteration it will execute this Callback Function
// Also as the forEach method call this Callback Function in each iteration, it will pass in the Current Element of the Array as an Argument (movement)
// Behind the scenes, in iteration 0 it will call function(200) meaning with the Value 200
// In the Next Iteration it will call it function(450) and so on, until the end of the Array

// What if we actually needed access to a Counter Variable in forEach?
// in forEach it is alot EASIER to get access to the Current Index
// forEach passes in the Current Element of the Array, The Index, and The Entire Array that we are looping
// therefore I can specify them in the Parameter List (movement, index, array)
// I can use 1, 2 or 3 Parameters in forEach (the Names DO NOT matter, only the ORDER)
// The 1st parameter needs to be the Current Element, 2nd Current Index, 3rd the Entire Array that I loop over.

movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`); // Movement 1: You deposited 200 Movement 2: You deposited 450... etc
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`); // Movement 3: You withdrew 400 etc....
  }
});

// the difference between for of and forEach, is that you CANNOT BREAK OUT of a forEach loop
// so the Continue and Break Statements DO NOT WORK in a forEach loop at all.
// forEach will always loop over the entire Array
// For Of loop I should use if I need to break out of a loop

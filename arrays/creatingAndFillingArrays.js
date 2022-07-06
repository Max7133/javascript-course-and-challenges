'use strict';

//////////////////////////////////////////////////////   MORE WAYS OF PROGRAMMATICALLY CREATING AND FILLING ARRAYS   //////////////////////////////////////////////////////

// We created Arrays like this:
// In this cases we already have our Data, therefore we can MANUALLY create these Arrays
console.log([1, 2, 3, 4, 5, 6, 7]); // (7) [1, 2, 3, 4, 5, 6, 7]
console.log(new Array(1, 2, 3, 4, 5, 6, 7)); // (7) [1, 2, 3, 4, 5, 6, 7]

// However, we can also GENERATE Arrays Programmatically, without having to define all the items Manually
// Easiest way with the Array Constructor Function
const x = new Array(7); // Creates a New Array with 7 Empty Elements
// Array() Function does it so that whenever we only pass 1 Argument then it creates a New Empty Argument with that length
console.log(x); // (7) [empty × 7]
// We CAN'T do ANYTHING with this 'x' Array, we CAN'T even use the Map Method to fill it up
console.log(x.map(() => 5)); // (7) [empty × 7]

// ONLY THING THAT WE CAN USE HERE IS THE FILL METHOD
// All we need to do is to pass in a Value and it will Fill it up the entire Array with this specific Value
// This DOES MUTATE the underlying Array (original Array)
// x.fill(1);
// console.log(x); // (7) [1, 1, 1, 1, 1, 1, 1]

// The Fill Method is similiar to the Slice Method
// Besides this Value that we want to Fill the Array with, we can also specify where we want it to start to Fill
// So lets Fill it starting at Index 3
// We also can specify the Begin Parameter and then it only starts at Index 3
// It will Fill it up until the end, unless we specify an End Parameter like in the Slice Method
// x.fill(1, 3);
// console.log(x); // (7) [empty × 3, 1, 1, 1, 1]
x.fill(1, 3, 5);
console.log(x); // (7) [empty × 3, 1, 1, empty × 2]

// Using Fill Method on other Arrays (dosen't have to be an Empty Array)
const arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 2, 6);
console.log(arr); // (7) [1, 2, 23, 23, 23, 23, 7]

// Array.from
// If we actually wanted to recreate the Array from our 1st example: const arr = [1, 2, 3, 4, 5, 6, 7];
// For that we can use the Array.from() Function
// Here we are NOT using the .from() here as a methond on an Array, instead we are using it on the Array() Constructor
// Array is a Function and then on this Function Object, we call the from() Method
// 1st passing an Object with the length Property
// 2nd passing as a 2nd Argument is a Mapping Function, so it is exactly like the Callback Function that we pass into the Map Method
// Recreating the Array with x7 '1'
// No Arguments, No Current Element, No Index
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // (7) [1, 1, 1, 1, 1, 1, 1]

// We get access to the Current Element and Current Index
// This Callback Function is exactly the same as in the Map Method
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// Random from 1 to 100
const r = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 100) + 1
);
console.log(r);

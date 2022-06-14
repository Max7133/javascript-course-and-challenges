'use strict';

///////////////////////////////////////////////   S I M P L E   A R R A Y   M E T H O D S   /////////////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE METHOD (DOES NOT MUTATE)
// Slice Method (similiar to String Slice Method)
// With Slice Method I can extract part of ANY Array, but without changing the ORIGINAL Array
// It will start extracting at Index 2 of the Array, and return a NEW Array
console.log(arr.slice(2)); // (3) ['c', 'd', 'e']
// Defining the END Parameter
// Just like in Strings, the END Parameter here is NOT included in the Output
// So, Index 4 'e', is NOT included, so 2 to 4 is really just 2 and 3
// (It dosen't touch Index 4, it STARTS at index 2 'c' and it ENDS on Index 3 'd')
console.log(arr.slice(2, 4)); // (2) ['c', 'd']
// Negative Begin Parameter (just like in Strings), it will start to copy from the END of the Array
console.log(arr.slice(-2)); // (2) ['d', 'e']
console.log(arr.slice(-1)); // [e]
// Using a Negative Index as the End Parameter
console.log(arr.slice(1, -2)); // (2) ['b', 'c']
// Creating a Shallow COPY of any Array with Slice Method
console.log(arr.slice()); // (5) ['a', 'b', 'c', 'd', 'e']
// Same Shallow COPY but with Spread Operator
console.log([...arr]); // (5) ['a', 'b', 'c', 'd', 'e']

// SPLICE METHOD (MUTATES)
// Splice Method works like Slice Method, but this time it DOES actually CHANGE the Original Array
// console.log(arr.splice(2)); // (3) ['c', 'd', 'e']
// Now what will happen to the Array is that it will only have the First Two elements,
// the Extracted Elements are now actually GONE from the Original Array, Splice Method DELETED THEM
// Splice Method takes the part of the Array, returns it, and then DELETES all the Elements it had Returned
// Usually we don't care what Splice Returns, we only intrested in, is just to Delete 1 or More Elements from the Array
// Common use case is to Delete the Last Element of an Array
arr.splice(-1);
console.log(arr); // (4) ['a', 'b', 'c', 'd']
// Second Parameter of the Splice Method is called deleteCount
// b & c should be Deleted
arr.splice(1, 2);
console.log(arr); // (2) ['a', 'd']

// REVERSE (MUTATES)
// Reverse Method, is reversing the Array and is going to Mutate(change) the ORIGINAL Array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // (5) ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // (5) ['f', 'g', 'h', 'i', 'j']

// CONCAT (DOES NOT MUTATE)
// Concat Method is used to Concatenate 2 Arrays
// The First Array is going to be on which the Concat Method is called
// The Second Array is the one I pass into the Concat Method
const letters = arr.concat(arr2);
console.log(letters); // (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// SAME solution with the Spread Operator
console.log([...arr, ...arr2]); // (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

// JOIN
// Join Method, the result will become a String with the Separator ' - ' that I specified
console.log(letters.join(' - ')); // a - b - c - d - e - f - g - h - i - j

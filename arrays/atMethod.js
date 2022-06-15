'use strict';

//ES2022
////////////////////////////// THE AT (ARRAY) METHOD ///////////////////////////////////////////

const arr = [23, 11, 64];
// If I want to take one of the Values out of the Array, Example the First Value
console.log(arr[0]); // 23
// With the NEW AT METHOD, I can do the exact same thing, using The At Method, specifying Index 0
console.log(arr.at(0)); // 23

// Getting the Last Element of the Array(When I don't know the Length of the Array)
console.log(arr[arr.length - 1]); // 64
// Same thing with Slice Method, to get just the Value without Array, I need to add [0] at the end
console.log(arr.slice(-1)); // [64] (BUT IT'S A COPY OF THAT ARRAY)
console.log(arr.slice(-1)[0]); // 64 (BUT IT'S A COPY OF THAT ARRAY)
// EASIER with the At Method
console.log(arr.at(-1)); // 64
console.log(arr.at(-2)); // 11

// The At Method also works on Strings!
console.log('Max'.at(0)); // M
console.log('Max'.at(-1)); // x

// The At Method is also very useful to use in METHOD CHAINING

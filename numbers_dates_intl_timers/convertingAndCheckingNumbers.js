'use strict';

/////////////////////////////////////////////   C O N V E R T I N G   A N D   C H E C K I N G   N U M B E R S   /////////////////////////////////////////////

// In JavaScript all Number are represented Internally as (Floating Point Numbers)
// Basically always as Decimals, no matter if we actually write them as Intergers or Decimals
// Proof
console.log(23 === 23.0); // true (That's the reason that JS has 1 Datatype for ALL Numbers)
// Numbers represented Internally in a 64 base 2 Format (Means: Numbers are always stored in a Binary Format 0s & 1s)

// Base 10 - 0 to 9
// Binary Base 2 - 0 1

// There are certain Numbers that are very difficult to represent in Base 2
// 1 Example of that is the fraction 0.1
console.log(0.1 + 0.2); // 0.30000000000000004

// 1/10 = 0.1. 3/10 = 3.3333333 (We cannot do really precise scientific or financial calclulations in JS )
// Proof
console.log(0.1 + 0.2 === 0.3); // false

// CONVERTING String to a Number
console.log(Number('23')); // 23
// Easier way (when JS sees the + Operator, it will do Type Coercion (it will Automatically Convert all the Operands to Numbers))
console.log(+'23'); // 23

// parseInt Function (whenever we need to read a INT Value out of a String)
// PARSING a Number from a String (parseInt Function)
// On a Number Object, which is kind of This Function here (because every Function is also an Object)
// This Number Object has some Methods to do Parsing
// I specified a String '30' it can include some Symbols, JS will automatically try to figure out the Number in this String
console.log(Number.parseInt('30px')); // 30 (THIS IS A NUMBER)
// In order to make this work, the String needs to start with a Number
console.log(Number.parseInt('e23')); // NaN
// The parseInt Function accepts a 2nd Argument (regex), and it is the Base of the Numeral System that we are using.
// '30px' - Base 10 Number (Numbers from 0 to 9), and MOST of the time, we are doing that
// And so we SHOULD ALWAYS PASS in the Number 10 here (for Avoiding some Bugs)
console.log(Number.parseInt('30px', 10)); // 30 (THIS IS A NUMBER)
console.log(Number.parseInt('e23', 10)); // NaN
// If we are working with BINARY, then we need to specify '2' instead of '10'

// parseFloat Function (whenever we need to read a FLOAT Value out of a String)
// Now it reads the Decimal Number from the String
// White Space dosen't affect the Result
console.log(Number.parseFloat('   2.5rem ')); // 2.5
console.log(Number.parseInt('    2.5rem   ')); // 2

// parseInt and parseFloat are also Global Functions
// We don't need to call them on the Number (but its a OLD SCHOOL WAY, so better to write the on a Number Object)
// console.log(parseFloat('    2.5rem   ')); // 2.5 (ALSO WORKS)

// isNaN Function (For checking is a Value is NaN)
// We can use it to check if Any Value is a Number
console.log(Number.isNaN(20)); // false
// Trying the same with the String
// also FALSE because this also isn't Not a Number, it's just a regular Value
console.log(Number.isNaN('20')); // false
// Trying with converting the String
// If I try to convert it to a Number, then this will be Not a Number
console.log(Number.isNaN(+'20X')); // true
// Dividing by 0 will result in INFINITE
// Infinity is also NOT NOT a NaN
console.log(Number.isNaN(23 / 0)); // false
// isNaN is actually not a Perfect Way for checking if a Value is a Number
// Example dividing on the console 23/0 will be Infinity (NaN dosen't consider this use case)

// isFinite Method (For checking if a Value is a Number)
// A better Method for that isFinite (the BEST way for checking if a Value is a Number, a REAL Number, NOT a String)
// isFinite at least when we are working with Floating Point Numbers, if we are sure that I just need to check for an Integer, then we can use isIntefer as well
// It should be the oposite of isNaN, because this is NOT NOT A NUMBER
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false (because it's NaN) (isFinite is a better way for checking is something is a Number or not)
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false (Infinity is not Finite)

// isInteger
console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(3.4)); // false
console.log(Number.isInteger(23.1)); // false
console.log(Number.isInteger(23 / 0)); // false

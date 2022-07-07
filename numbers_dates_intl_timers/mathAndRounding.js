'use strict';

/////////////////////////////////////////////   M A T H   A N D   R O U N D I N G   /////////////////////////////////////////////
// ALL OF THEM CAN DO TYPE COERCION

// Square Root - is part of the Math namespace
console.log(Math.sqrt(25)); // 5
// same Result with ** Operator
console.log(25 ** (1 / 2)); // 5
// same would work with Cubic Root of 8
console.log(8 ** (1 / 3)); // 2

// Getting the Maximum Value
console.log(Math.max(5, 18, 23, 11, 2)); // 23
// Math.max DOES Type Coercion (I should STILL GET the Value 23 (as a Number))
console.log(Math.max(5, 18, '23', 11, 2)); // 23
// Math.max DOES NOT do Parsing
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN

// Getting the Minimum Value
console.log(Math.min(5, 18, 23, 11, 2)); // 2

// Constants on the Math Object
// Calculating the Radius of a Circle with 10 Pixels
console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592653589793

// Random Function on the Math Object
// Just Math.random will give a Random Float Value between 0 and 1
// Math.trunc REMOVES the Decimal part
console.log(Math.trunc(Math.random() * 6) + 1); // Gets RANDOM Values between 1 and 6

// Generalizing the UPPER Formula, so I can usei it from now on to ALWAYS GENERATE Random Integers between 2 Values
const randomInt = (min, max) =>
  // This will always be a Number that's going to stay between Min & Max
  Math.floor(Math.random() * (max - min) + 1) + min; // 0...1 -> 0...(max - min) -> min...max
console.log(randomInt(10, 20)); // RANDOM Values between 10 and 20

// Rounding Integers
console.log(Math.trunc(23.4)); // 23
console.log(Math.trunc(23.5)); // 23
console.log(Math.trunc(23.6)); // 23

// There are OTHER WAYS

// Math.round() Will always round to the NEAREST INTEGER
console.log(Math.round(23.4)); // 23
console.log(Math.round(23.5)); // 24
console.log(Math.round('23.6')); // 24

// Math.ceil() Will round UP
console.log(Math.ceil(23.4)); // 24
console.log(Math.ceil(23.5)); // 24
console.log(Math.ceil('23.6')); // 24

// Math.floor() Will round DOWN
console.log(Math.floor(23.4)); // 23
console.log(Math.floor(23.5)); // 23
console.log(Math.floor('23.6')); // 23

// Math.floor() & Math.trunc() do the same with POSITIVE NUMBERS
// But NOT with NEGATIVE NUMBERS
// That makes Math.floor() prefered over Math.trunc()
console.log(Math.trunc(-23.6)); // -23
console.log(Math.floor(-23.6)); // -24 (because with Negative Numbers, rouding does the other way around)

// toFixed Method (will ALWAYS RETURN A STRING AND NOT A NUMBER)

// Rounding Decimals (Floating Point Numbers)
// With Decimals it works in a bit Different way
// 1st need to specify the Numbers in Parenthesis
// 2nd on THAT Number we call the toFixed() Method
console.log((2.7).toFixed(0)); // 3 (IS A STRING)
console.log((2.7).toFixed(3)); // 2.700 (IS A STRING) it will ADD 0s until it has 3 DECIMAL PARTS, like I specified here toFixed(3)
console.log((2.345).toFixed(2)); // 2.35 (IS A STRING)
// If I want to Convert this Result to a Number
console.log(+(2.345).toFixed(2)); // 2.35 (A NUMBER)

// With Decimals (Floating Point Numbers) it works differently, than with Integers and Debts.
// And that's because things in JS evolved in a weird way in this kind of old language
// This works in a similiar way than the String Methods
// Number is a Primitive, Primitives DON'T HAVE Methods
// So behind the scenes JS will do BOXING (Transforming this in to a Number Object, then call the Method ON that Object)
// And then once the operation is finished, it will convert it back to a Primitive.

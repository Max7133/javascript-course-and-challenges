'use strict';

/////////////////////////////////////////////   N U M E R I C   S E P A R A T O R S   /////////////////////////////////////////////
// ES2021
// Numeric Separators for formating the Numbers in a way that is easier for us, or for other developers to read and to understand.
// Representing a Really Large Number (Diameter of Solar System)
//// const diameter = 287460000000; // Difficult to read/understand the Number
// 287,460,000,000
// Doing the SAME with JS using the Numeric Separators - underscores '_' where we can place anywhere that we want in our numbers
const diameter = 287_460_000_000;
console.log(diameter); // 287460000000

// I can place Numeric Separators ANYWHERE I WANT
const priceCents = 345_99;
console.log(priceCents); // 34599

const transferFee1 = 15_00; // something like 15 EUR and 00 cents
const transferFee2 = 1_500; // something like 1 thousand 5 hundred

// Some Restrictions as to where we can place the '_'
// We can only place '_' between Numbers
// const PI = 3._1415; // NOT ALLOWED
// const PI = 3_.1415; // NOT ALLOWED
// const PI = _3.1415; // NOT ALLOWED
// const PI = 3.1415_; // NOT ALLOWED
// const PI = 3.14__15; // NOT ALLOWED
const PI = 3.14_15; // ALLOWED
console.log(PI); // 3.1415

// Need to be AWARE OF
// When converting Strings that Contain '_' to a Number, that WILL NOT WORK AS EXPECTED
console.log(Number('230000')); // 230000 (A NUMBER)
// With Numeric Separator, the Conversion from String to Number will FAIL
console.log(Number('230_000')); // NaN
// This means that I should ONLY use Numeric Separator, when writing JUST Numbers, like in all other example that I wrote here
// If I need to store a Number in a String (like in an API), or if I get a Number as a String from an API, I should NOT use '_' in an API
// Because then JS would NOT able to Parse the Number correctly out of that String
// I will get NaN which will lead to some Bugs
// The SAME is True with the parseInt Function (I will only get the 1st part before the '_'). everything else will be IGNORED
console.log(parseInt('230_000_345')); // 230

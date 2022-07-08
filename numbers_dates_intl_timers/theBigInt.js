'use strict';

/////////////////////////////////////////////   B I G   I N T   /////////////////////////////////////////////
// A Primitive data type (special type of Integers from ES2020)

// Numbers are represented internally as 64 BITS. (MEANS there are EXACTLY 64 01010101 for representing ANY GIVEN NUMBER)
// Of these 64 BITS only 53 are USED to actually store the digits themselves.
// the REST are for storing the position of the decimal point and the sign.
// If there are only 53 BITS to store the Number, means that there is a Limit, of how BIG Numbers can be

// Calculating THIS Number
// It is 2 because we are working with BASE 2, which has only 0s and 1s
console.log(2 ** 53 - 1); // (9007199254740991) The biggest number that JS can safely represent
// This Number is so IMPORTANT that it's even stored into the Number Namespace
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// 9007199254740991 <- Integers Larger than THIS (ARE NOT SAFE), means cannot be represented accurately.
console.log(2 ** 53 + 1); // 9007199254740992 (NOT CORRECT) it only added 1 Number, where it should have added 2
console.log(2 ** 53 + 0); // 9007199254740992 (NOT CORRECT) I got the exact same Value
// So we keep adding Numbers here, and they are Always the Same
// That means that JavaScript can simply not represent these Numbers accurately.
// Conclusion: if we do calculations with Numbers that are Bigger than the Max Safe Value, we might lose precision.

// In some Numbers it DOES actually work, but that's because JS Behind the Scenes uses some tricks, to still represent some of the UNSAGE NUMBERS
console.log(2 ** 53 + 1); // 9007199254740992
console.log(2 ** 53 + 2); // 9007199254740994 (ADDED 2)
console.log(2 ** 53 + 3); // 9007199254740996 (ADDED 2)
console.log(2 ** 53 + 4); // 9007199254740996 (ADDED 0)

// THIS can be a problem sometimes, because in some situations we might need really Big Numbers (bigger than Max Safe Value).
// For example database IDs, or when iteractiong with Real 60 BIT Numbers. (that are actually used in OTHER LANGUAGES)
// So we might, from example some API get a Number larger than this Max Safe Value, and then we have no way of storing that in JS.
// Thats why JS has BigInt
console.log(343434345675713523452352345); // 3.434343456757135e+26
// If I add 'n' at the end, the Result will be BigInt
// Basically 'n' Transforms a Regular Number to BigInt
console.log(343434345675713523452352345n); // 343434345675713523452352345n

// We can also create BigInt with BigInt Function
// The result will be the same, but from a certain point on it will be a bit different
// JS will first have to still represent this Number INTERNALLY,before it can then transform it into a BigInt
console.log(BigInt(343434345675713523452352345)); // 343434345675713517826605056n
// so this Constructor Function, should only be used with small Numbers
console.log(BigInt(343434345)); // 343434345n

// Operations with BigInt Numbers
// All the usual Operators, still work the Same (10000n + 10000n = 20000n)
console.log(10000n + 10000n); // 20000n
console.log(74234234234325235234523235325223535n * 10000000000000n); // 742342342343252352345232353252235350000000000000n

// NOT POSSIBLE, to Mix BigInt with Regular Numbers
const huge = 232141242352353425235n;
const num = 23;
// console.log(huge * num); // ERROR
// To FIX it, this is where the Constructor BigInt Function becomes necessary
console.log(huge * BigInt(num));

// 2 Exceptions to this, which with will NOT work
// 1.) Comparison Operators, 2.) the + Operator, when working with Strings.

// 1.) with Comparison Operators
// Will WORK
console.log(20n > 10); // true
// Will NOT WORK (make sence, because with '===' JS does NOT do Type Coercion)
// And 20n & 20 Values have a different Primitive Type (BigInt & Regular Number)
console.log(20n === 20); // false
console.log(typeof 20n); // bigint

// Will be true, because this time JS WILL do Type Coercion with '=='
console.log(20n == 20); // true (it will Convert BigInt to a Regular Number)
// It will even work like this
console.log(20n == '20');

// 2.) with the + Operator, when working with Strings.
console.log(huge + ' is REALLY big!!!'); // 232141242352353425235 is REALLY big!!! (the Number isn't actually Converted to a String)

// Math operations also won't work with BigInt
// console.log(Math.sqrt(16n)); // ERROR

// Divisions
// BigInt is an Integer
console.log(10n / 3n); // 3n (with BigInt it will Return the closes BigInt), it Cuts the Decimal part off
console.log(12n / 3n); // 4n
console.log(10 / 3); // 3.3333333333333335

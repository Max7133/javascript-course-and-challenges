'use strict';

/////////////////////////////////////////////   T H E   R E M A I N D E R   O P E R A T O R   /////////////////////////////////////////////
// The Remainder operator '%', Returns the remainder of a division.
console.log(5 % 2); // 1
// Why? 5 / 2 = 2.5, but if I take only the Integer part, the Result will be 2, 2 * 2 = 4, and the Remainder is 1
console.log(5 / 2); // 2.5 (5 = 2 * 2 + 1)
console.log(8 % 3); // 2
console.log(8 / 3); // 2.6666666666666665 (8 = 2 * 3 + 2)

// Even: 0, 2, 4, 6, 8, 10, 12 etc...
// Odd: 1, 3, 5, 7, 9, 11, 13 etc...
console.log(6 % 2); // 0
console.log(6 / 2); // 3
// Because dividing 6 by 2 is an Integer Number, so its EXACTLY 3

console.log(7 % 2); // 1
console.log(7 / 2); // 3.5

// Whether a certain Number is Even or Odd
const isEven = n => n % 2 === 0;
console.log(isEven(8)); // true
console.log(isEven(23)); // false
console.log(isEven(514)); // true

// If ANY Number is divisible by ANY OTHER Number
labelBalance.addEventListener('click', function () {
  // Whenever the result of the % Operator is 0, then that 1st Number is completely Divisible by the 2nd Number
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // I want to COLOR every second row of the 'movements'
    // 0, 2, 4, 6 etc... (every 2nd time)
    if (i % 2 === 0) row.getElementsByClassName.backgroundColor = 'orangered';
  }); // it will Return a node list
  // Now I want to paint every 3rd row, in a different color
  // at row 0, 3, 6, 9 etc... (every 3rd time)
  if (i % 3 === 0) row.getElementsByClassName.backgroundColor = 'blue';
});

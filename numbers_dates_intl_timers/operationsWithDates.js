'use strict';

/////////////////////////////////////////////   O P E R A T I O N S   W I T H   D A T E S   /////////////////////////////////////////////

const future = new Date(2037, 10, 19, 15, 23);
// Converting 'future' to a Number
console.log(Number(future)); // 2142249780000 (Timestamp in milliseconds)
console.log(+future); // 2142249780000
// Means I can do operations with it, like ex. subtracting

// Function that takes in 2 Dates, will Return the Number of days that pass between these 2 Dates

const calcDaysPassed = (date1, date2) =>
  // Math.abs REMOVES Negative Value
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); // converting to Days;
const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1); // 10 (Days)

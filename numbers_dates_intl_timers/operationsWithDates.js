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

/////////////////////

const num = 3884764.23;

// 'options' Object for Formatting
// I will Pass this Object as a 2nd Argument in new Intl.NumberFormat()
const options = {
  style: 'unit',
  unit: 'mile-per-hour',
  // useGrouping: false, (will REMOVE separators from Numbers)
};

// Formating, by doing new Intl, and using a Number Format that takes a Local String 'en-US'
// All this creates a Formatter on which I call the Format Method, where I pass in what I want to Format: 'num'
console.log('US:', new Intl.NumberFormat('en-US', options).format(num)); // US: 3,884,764.23 mph
console.log('Germany:', new Intl.NumberFormat('de-DE', options).format(num)); // Germany: 3.884.764,23 mi/h
console.log('Syria:', new Intl.NumberFormat('ar-SY', options).format(num)); // Syria: ٣٬٨٨٤٬٧٦٤٫٢٣ ميل/س
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
); // en-US 3,884,764.23 mph

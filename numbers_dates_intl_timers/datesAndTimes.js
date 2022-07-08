'use strict';

/////////////////////////////////////////////   D A T E S   A N D   T I M E S   F U N D A M E N T A L S   /////////////////////////////////////////////

// Creating a Date (4 ways) with New Date Constructor Function, but with different Parameters

const now = new Date();
console.log(now); // Fri Jul 08 2022 17:24:10 GMT+0300 (Eastern European Summer Time)

// Parsing the Date from a Date String
console.log(new Date('Jul 08 2022 17:24:10')); // Fri Jul 08 2022 17:24:10 GMT+0300 (Eastern European Summer Time)
// (writing the Date ourselves is NOT a very good idea)
console.log(new Date('December 24, 2015')); // Thu Dec 24 2015 00:00:00 GMT+0200 (Eastern European Standard Time)
// Date written by JS is perfectly fine
// console.log(new Date(account1.movementsDates[0]));

// Based on a Year, Month, Day, Hour, Second
// The Month in JS is ZERO BASED
console.log(new Date(2098, 10, 19, 15, 23, 5)); // Wed Nov 19 2098 15:23:05 GMT+0200 (Eastern European Standard Time)
// JS Autocorrects the Day (with November 31st) November only has 30 days
console.log(new Date(2098, 10, 31)); // Mon Dec 01 2098 00:00:00 GMT+0200 (Eastern European Standard Time)
console.log(new Date(2098, 10, 33)); // Mon Dec 03 2098 00:00:00 GMT+0200 (Eastern European Standard Time)

// Passing into the Date Constructor Function the amount of Milliseconds passed since the beginning of the UNIX TIME (JAN 1, 1970)
// 0 Milliseconds after that initial UNIX TIME
console.log(new Date(0)); // Thu Jan 01 1970 02:00:00 GMT+0200 (Eastern European Standard Time)
// 3 days after that initial UNIX TIME
// 3 days, 24 hours, 60 minutes, 60 seconds, 1000 milliseconds (to convert to milliseconds)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sun Jan 04 1970 02:00:00 GMT+0200 (Eastern European Standard Time)

// These Dates that I hav here is just another Special Type of Object
// Therefore they have their own Methods, I can use them to get, or set Components of a Date
const future = new Date(2098, 10, 19, 15, 23);
console.log(future); // Wed Nov 19 2098 15:23:00 GMT+0200 (Eastern European Standard Time)
// I can use 'future' which is this Object here (NEVER USE getYear())
console.log(future.getFullYear()); // 2098
console.log(future.getMonth()); // 10 (Months are 0 Based)
console.log(future.getDate()); // 19 (This is the DAY of the MONTH)
console.log(future.getDay()); // 3 (This is the DAY of the WEEK (Wednesday) )
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0
// Getting nicelly formated String
// Very useful case is when I want to Convert a particular Date Object into a String that I can then store somewhere
// Because the Same Date result Syntax I got from here: console.log(new Date(account1.movementsDates[0]));
console.log(future.toISOString()); // 2098-11-19T13:23:00.000Z

// Getting the Timestamp for the Date
// Timestamp is the Milliseconds which have passed since UNIX TIME (JAN 1, 1970)
console.log(future.getTime()); // 4067241780000
// Reversing the previous Result (it will show the Exactly Same Time from 'future')
// Based on the Milliseconds that have passed since JAN 1, 1970
console.log(new Date(4067241780000)); // Wed Nov 19 2098 15:23:00 GMT+0200 (Eastern European Standard Time)

// Timestamps are IMPORTANT, and there is a special Method that I can use, to get the Timestamp for RIGHT NOW.
// So if I want the CURRENT TIMESTAMP for THIS EXACT MOMENT, then I Don't Even Need to create a New Date
// All I need to do, is to call 'Date.now()'
console.log(Date.now()); // 1657295912646

// There are also the Set Versions of ALL UPPER METHODS that I wrote here
// for the Year (it's a Method, so I set it to 2040)
future.setFullYear(2040);
console.log(future); // Mon Nov 19 2040 15:23:00 GMT+0200 (Eastern European Standard Time)

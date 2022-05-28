'use strict';

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

//spliting the String and then the Array with '+' ';'
for (const flight of flights.split('+')) {
  // destructuring the array
  const [type, from, to, time] = flight.split(';');
  // startsWith() is a boolean, that's why I used the Ternary Operator here
  const output = `${type.startsWith('_Delayed') ? '+' : ''}${type.replaceAll(
    '_',
    ' '
    // slice(0, 3) example fao93766109 === fao
    // padStart === all Strings are now 36 characters long
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
  console.log(output);
}

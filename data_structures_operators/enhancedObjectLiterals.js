'use strict';

//// 3.)We can now compute(calculate) property names instead
// instead of having to write them out manually and literally
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// OLD
// const openingHours = {
//   thu: {
//     open: 12,
//     close: 22,
//   },
//   fri: {
//     open: 11,
//     close: 23,
//   },
//   sat: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// };

// Now I want to take these property names below in openingHours out of that Array
// While using '[]' syntax, and then I can put there any expression
// ES6 NEW
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  // Just example what else I can do
  [`day-${2 + 4}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

/////////////// E N H A N C E D    O B J E C T   L I T E R A L S   /////////////////////////

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 3 ways to write
  //// 1.)When we have an Object outside an Object

  // Before ES6
  // openingHours: openingHours,

  // ES6 enhanced object literals
  // This will take this openingHours Object, and put it into the restaurant Object
  // and create a property name with exactly that Variable name.
  // If I rename it on the top, I also will have to rename it below
  openingHours,

  //// 2.)Is about writing methods, in ES6 we no longer have to create a property,
  // and then set it to a function expression

  //Before ES6
  //   order: function (starterInd, mainInd) {
  //     return [this.starterMenu[starterInd], this.mainMenu[mainInd]];
  //   },

  //ES6 (basicly removes the ': function')
  order(starterInd, mainInd) {
    return [this.starterMenu[starterInd], this.mainMenu[mainInd]];
  },
};

//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },
// };

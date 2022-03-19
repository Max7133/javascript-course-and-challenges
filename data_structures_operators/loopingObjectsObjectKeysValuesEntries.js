'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// 1.)PROPERTY NAMES
// Checking Object.keys
const properties = Object.keys(openingHours);
console.log(properties); // ['thu', 'fri', 'sat']

// Printing a string, How Many Days The Restaurant Is Open
// console.log(`We are open on ${properties.length} days`); // We are open on 3 days

///////////////////////   L O O P I N G    O B J E C T S:   O B J E C T   K E Y S,   V A L U E S   A N D   E N T R I E S   ////////////////////////////////
// Looping over property names(keys).
// Looping over array Object.keys(openingHours)

// for (const day of Object.keys(openingHours)) {
//   console.log(day); // thu, fri, sat
// }

// Storing the array in to a variable
let openStr = `We are open on ${properties.length} days: `; // We are open on 3 days

// Object.keys(openingHours) I later set to properties
for (const day of properties) {
  openStr += `${day}, `; // We are open on 3 days: thu, fri, sat,
}
console.log(openStr);

// 2.)PROPERTY VALUES
const values = Object.values(openingHours);
console.log(values); // {open: 12, close: 22} (FOR THU, FRI, SAT)

// 3.)ENTRIES OBJECT (ARE KEYS + VALUES)
const entries = Object.entries(openingHours);
console.log(entries); // [Array(2), Array(2), Array(2)] after opening each ['thu', {…}] ['fri', {…}] ['sat', {…}]

//for (const [key, value] of entries) {
// value is an object that we going to also destructure
// 2 Variable names in that object are 'open' and 'close'
// So I specify exactly them below and they get destructured
for (const [key, { open, close }] of entries) {
  // console.log(x); // ['thu', {…}] ['fri', {…}] ['sat', {…}]
  console.log(`On ${key} we open at ${open} and close at ${close}`); // On thu we open at 12 and close at 22 (AND SAME THING FOR 'fri' and 'sat')
}

// {open: 12, close: 22} Is the value from Above
// if I had simpler object (not nested) I would frite only for example [key, value]

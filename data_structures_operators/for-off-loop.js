'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
//////////////// L O O P I N G   A R R A Y S: The for-of Loop (ES6) ////////////////////////

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu); // ['Pizza', 'Pasta', 'Risotto', 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']
// The for-of Loop
// The 'item' variable is always, the current element in each iteration
// no code block {} because we have only one statement here to execute
// I can use continue; break; in for-of Loop
for (const item of menu) console.log(item); // Pizza
// Pasta
// Risotto
// Focaccia
// Bruschetta
// Garlic Bread
// Caprese Salad

// If I also want the current index besides just element
// for (const item of menu.entries()) {
//   console.log(item); // [0, 'Pizza'] etc...
//   console.log(`${item[0] + 1}: ${item[1]}`); // 1: Pizza
// }

// Better way with destructuring
for (const [item, dish] of menu.entries()) {
  console.log(`${item + 1}: ${dish}`); // 1: Pizza
}

// It is an array, which in each position contains a new array
// which contains the element and the index number of that element in the original array
// Thats why I get [0, 'Pizza'] and so on
console.log([...menu.entries()]); // [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]
// [0, 'Pizza'] etc...

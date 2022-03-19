'use strict';
///////////////// S E T S //////////////////////////
// Set is a collection of unique values (can't never have any duplicates)
// Set can also hold mixed datatypes
// Set is an iterable
// Set order is irrelevant
// HAS method to check for an item in the Set

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet); // Set(3) {'Pasta', 'Pizza', 'Risotto'}
console.log(new Set('Jonas')); // Set(5) {'J', 'o', 'n', 'a', 's'}
console.log(ordersSet.size); // 3
console.log(ordersSet.has('Pizza')); // true
console.log(ordersSet.has('Bread')); // false
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');

// To delete everything in a Set
// ordersSet.clear(); // Set(0) {size: 0}

console.log(ordersSet); // Set(3) {'Pasta', 'Pizza', 'Garlic Bread'}

// Looping over SETS

for (const order of ordersSet) console.log(order); // Pasta, Pizza, Garlic Bread

// Main usecase of SETS is to remove duplicate values of Arrays
// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffUnique = new Set(staff);
// console.log(staffUnique); // Set(3) {'Waiter', 'Chef', 'Manager'}

// Converting a Set to an Array with a Spread Operator
const staffUnique = [...new Set(staff)];
console.log(staffUnique); // (3) ['Waiter', 'Chef', 'Manager']

// Second example for knowing how many different elements are but in digits
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
); // 3

// Counting how many LETTERS there are in a set
console.log(new Set('jonasschmedtmann').size); // 11

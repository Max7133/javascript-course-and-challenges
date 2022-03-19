'use strict';

////////////////////   M A P S   F U N D A M E N T A L S   ///////////////////////////
// Map is a data structure that we can use to map values to keys. (just like in obj, data is stored in key value pairs in maps)
// In Maps, the keys can have any type (In Object the keys are strings)

const rest = new Map();
// Set method is like Add method in Sets

// Calling the Set method like this, does not only update the map that it's called on,
// but it also returns the Map
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisabon, Portugal')); // Map(3) {'name' => 'Classico Italiano', 1 => 'Firenze, Italy', 2 => 'Lisabon, Portugal'}

// Since Set Method also returnes the updated Map, allows us to chain the set method like this...
// Example
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :)')
  .set(false, 'We are closed :(');
// In order to read data from a map, we use Get Method
// I need to pass in the Name of the Key
console.log(rest.get('name')); // Classico Italiano
console.log(rest.get(true)); // We are open :)
console.log(rest.get(1)); // Firenze, Italy

// Example with boolean keys
const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // We are open :) (Because 21 is < 23)

// Checking if a Map Contains a certain Key
console.log(rest.has('categories')); // true

// Deleting elements from the Map
rest.delete(2);
console.log(rest); // DELETED THE 'Lisabon, Portugal'

// Size property in Map
console.log(rest.size); // 7

// Remove all elements from the Map
// rest.clear();
// console.log(rest); // Map(0) {size: 0}

// Using Arrays or Objects as Map Keys
// As a Key, using the Array bellow
const arr = [1, 2];
rest.set(arr, 'Test Array Key');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest); // Map(9) {'name' => 'Classico Italiano', 1 => 'Firenze, Italy', 'categories' => Array(4), 'open' => 11, 'close' => 23, …}
console.log(rest.size); // 9

console.log(rest.get(arr)); // Test Array Key

'use strict';

/////////////////////////////////  F O R   E A C H   O N   M A P S   A N D   S E T S  ///////////////////////////////////////////////////

// forEach with Maps
// In this Array of Arrays, each of these Array Elements, will be one Entry of the Map
// 'USD' = Key, 'United States dollar' = Value
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// When forEach Method calls the Callback Function, it will call it with these 3 Arguments,
// 1st = Current Value in the Current Iteration
// 2nd = Key
// 3rd = Entire Map that is beeing looped over
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`); // USD: United States dollar.....
});

// forEach with Sets
// I need to pass an Iterable, so I will use an Array
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique); // Set(3) {'USD', 'GBP', 'EUR'}
// Calling forEach on this Set (has 3 parameters same as Map, Value, Key, Map)
// currenciesUnique.forEach(function (value, key, map) {
// the Key is SAME as Value, because a Set DOSEN'T HAVE KEYS
// and a Set DOSEN'T HAVE INDEXES either.
// And so there is no value that would make sense for the Key.
// So THIS is how I should write
// '_' = Throwaway Variable (a Variable that is completely unnecessary)
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${key}: ${value}`); // USD: USD.....
});

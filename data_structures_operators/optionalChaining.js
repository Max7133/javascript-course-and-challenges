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

  order: function (starterInd, mainInd) {
    return [this.starterMenu[starterInd], this.mainMenu[mainInd]];
  },
};

////////////////////// O P T I O N A L   C H A I N I N G (.?) //////////////////////////////////
//new feature for objects & arrays

// I want to get openingHours for monday (monday didn't exist)
// 'open' I want to get the hour when exactly the restaurant opens on monday
console.log(restaurant.openingHours.mon); // undefined
//console.log(restaurant.openingHours.mon.open); // error

// To find an error, I first need to find out 'mon' exist
if (restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open); // Nothing because dosen't exist
}

if (restaurant.openingHours.fri) {
  console.log(restaurant.openingHours.fri.open); // 11
}

// OLD way
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open); // Nothing because dosen't exist
}

// OPTIONAL CHAINING (ES2020) - if the property dosen't exist, it will return 'undefined'
// NEW way
// Only if the property that is before the '?' (in this case monday)
// then this 'open' property will be read from there
// if not, it will imediately return 'undefined'
// exist here means the nullish concept (not 'null' and 'undefined')
// if it's '0' or '' it still exists
console.log(restaurant.openingHours.mon?.open); // undefined

// Also we can have multiple OPTIONAL CHAININGS
// here for example if openeningHourse dosen't exist,
// then 'mon' won't even be read, because it will straigt get undefined on the openingHours
console.log(restaurant.openingHours?.mon?.open); // undefined

// Example
// I want to loop over this array, and then lock to the console,
// whether the restaurant is open or closed on each of the days
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  // console.log(day); // mon, tue, wed, etc...
  // If I wan't to use a variable name as the property name, then use []
  // Same as openingHours.mon.tue.wed.thu.fri.sat.sun
  // const open = restaurant.openingHours[day]?.open || 'closed' will be 0, because 0 is a falsy value
  // const open = restaurant.openingHours[day]?.open ?? 'closed' will be 24, for the NULLISH OP is if 0 and '' are truthy values
  // NULLISH OP & OPTIONAL CHAINING follow the same rule (Nullish Values are Null and Undefined)
  const open = restaurant.openingHours[day]?.open ?? 'closed'; // On mon, we open at closed
  console.log(`On ${day}, we open at ${open}`); //On mon, we open at undefined, On thu, we open at 12 etc...(I just didn't write it for every day)
}

// OPTIONAL CHAINING ON METHODS
//We can check if the Method exists before we call it
//This method exists
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist'); // ['Focaccia', 'Pasta']
//This method dosen't exist
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist'); // Method does not exist

// OPTIONAL CHAINING ON ARRAYS
//We can check if the array is empty
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
//Now I get the first element of the array
//'?' checks if users[0] exist
console.log(users[0]?.name ?? 'User array empty'); // Jonas

//OLD way
if (users.length > 0) console.log(users[0].name);
else console.log('user array empty'); // Jonas

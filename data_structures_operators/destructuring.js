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

  //RETURN MULT VALUES
  order: function (starterInd, mainInd) {
    return [this.starterMenu[starterInd], this.mainMenu[mainInd]];
  },

  //Passing an OBJECT as an ARGUMENT into the FUNCTION (when someone dosen't know the order of the parameters)
  orderDelivery: function ({
    starterInd = 1,
    mainInd = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterInd]} and ${this.mainMenu[mainInd]} will be delivered to ${address} at ${time}`
    );
  },
};
// Passing in the object of options from the function above
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainInd: 2,
  starterInd: 2,
});
//Order received! Garlic Bread and Risotto will be delivered to Via del Sole, 21 at 22:30

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterInd: 1,
});
//Order received! Bruschetta and Pizza will be delivered to Via del Sole, 21 at 20:00

//// D E S T R U C T U R I N G    O B J E C T S ////
// (like in Arrays) Creates 3 new variables, based on the restaraunt object variables
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories); // Classicon Italiano; {thu: {...}, fri: {...}, sat: {...}}; [Italian, Pizzeria, Vegetarian, Organic]

// If we wanted variable names different from the objects one
const {
  name: restarauntName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restarauntName, hours, tags); // Classicon Italiano; {thu: {...}, fri: {...}, sat: {...}}; [Italian, Pizzeria, Vegetarian, Organic]

//Setting default values like in arrays, there is no 'menu', an empty array menu = [] if the value 'menu' dosen't exist
const { menu = [], starterMenu: starters = [] } = restaurant; // starterMenu does exist! Thats why = [] won't apply to starterMenu, but it will apply to 'menu'
console.log(menu, starters); // [], [Focaccia, Bruschetta, Garlic Bread, Caprese Salad]

////Mutating variables while Destructuring objects
let o = 111;
let w = 999;
const obj = { o: 23, w: 7, q: 14 };
//objects we need to wrap with ()
({ o, w } = obj);
console.log(o, w); // 23, 7

//// Nested objects
const { fri } = openingHours;
console.log(fri); // {open: 11, close: 23}
const {
  fri: { open, close },
} = openingHours;
console.log(open, close); // 11, 23
// Assigning different variable names to them
const {
  fri: { open: otkrqto, close: zakrqto },
} = openingHours;
console.log(otkrqto, zakrqto); // 11, 23

//// D E S T R U C T U R I N G    A R R A Y S ////
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

///ARRAY DESTRUCTURING
const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

const [first, , third] = restaurant.categories;
console.log(first, third); // Italian, Vegetarian
console.log(restaurant.categories); //  ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']

let [main, , secondary] = restaurant.categories;
console.log(main, secondary); // Italian, Vegetarian

//// switching the elements im array(OLD WAY)
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

//// switching the element in array(NEW WAY, DESTRUCTURING)

[main, secondary] = [secondary, main];
console.log(main, secondary); // Vegetarian, Italian

//RETURN MULT VALUES
console.log(restaurant.order(2, 0)); // Garlic Bread, Pizza

//NOW I DESTRUCTURE THIS
//Receuce 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse); // Garlic Bread, Pizza

//DESTRUCTURIG WITH NESTED ARRAY
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j); // 2, [5, 6]
const [k, , [l, m]] = nested;
console.log(k, l, m); // 2, 5, 6

//SET DEFAULT VALUES FOR THE VARIABLE WHEN WE ARE EXTRACTING THEM
// FOR INSTANCE WE DON'T KNOW THE LENGHT OF THE ARRAY
// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); // 8, 9, 1 (r = became 1)

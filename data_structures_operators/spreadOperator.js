'use strict';
/////////// T h e   S p r e a d   O p e r a t o r //////////

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr); // [1, 2, 7, 8, 9]

// ES6 The Spread Operator way
// The Spr Op takes all values out from 'arr' array, and then it adds them individualy as we would type them manualy like in the badNewArr
const goodNewArr = [1, 2, ...arr];
console.log(goodNewArr); // [1, 2, 7, 8, 9]

// Logging individual elements of goodNewArr
console.log(...goodNewArr); // 1 2 7 8 9

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
  // To order just Pasta, and exactly 3 Ingredients!
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    const allIng = [mainIngredient, ...otherIngredients];
    console.log(allIng);
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// Creating a New array from mainMenu with one more food item in the main menu array.
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);
// The Spr Op, takes all elements from array, and dosen't create new variables,as a consequense we can only use it in the places where we write values separated by commas

// Creating two shalow copies of arrays, and merging them together
// Copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Merge 2 arrays or more
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// The Spr Op works also on all Iterables
// Iterables: arrays, strings, maps, sets) BUT NOT OBJECTS
// We get an array, where each letter of the original string is now a individual element.
const str = 'Jonas';
const letters = [...str, '', 'S.'];
console.log(letters); // ['J', 'o', 'n', 'a', 's', '', 'S.']
console.log(...str); // J o n a s

// We can only use The Spr Op
// 1.) when building an array
// 2.) when we pass values into a function.

// We CAN'T do with The Spr Op
// 1.) Build a string using a template literal
// console.log(`${...str} Schmedtmann`); // SYNTAX ERROR

// MULTIPLE CALUES SEPARATED BY A ',' ARE USUALLY ONLY EXPECTED...
// 1.) WHEN WE PASS ARGUMENTS INTO A FUNCTION
// 2.) WHEN WE BUILD A NEW ARRAY

// WRITING A FUNCTION (UPPER) THAT ACCEPTS MULTIPLE ARGUMENTS
// THEN USING THE SPREAD OPERATOR TO PASS THOSE ARGUMENTS
// PROMPT popup window in the console
const ingredients = [
  //   prompt("Let's make pasta ! Ingredient 1?"),
  //   prompt('Ingredient 2?'),
  //   prompt('Ingredient 3?'),
];
console.log(ingredients); // ['a', 'b', 'c']

// Old way
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]); // Here is your delicious pasta with a, b, c
// New way
restaurant.orderPasta(...ingredients); // Here is your delicious pasta with a, b, c

// SINCE ES2018 THE SPREAD OPERATOR ALSO WORKS ON OBJECTS, EVEN THOUG OBJECTS ARE NOT ITERABLES
// Objects
// Creating a New Restauraunt Object with all the data from the original one + some additional data
// THE ORDER DOSEN'T MATTER WHERE I WRITE THE SPR OPER, AND ELEMENTS
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

// CREATING SHALOW COPIES OF OBJECTS
// Will have different output, because if one objects changes, the other one also changes (CHECK PREVIOUS SECTION IF QUESTIONS)
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); // Ristorante Roma
console.log(restaurant.name); // Classico Italiano

///// R E S T   P A T T E R N   A N D   R E S T   P A R A M E T E R S

// 1) D E S T R U C T U R I N G

// SPREAD OP, because on RIGHT side of =
const aray = [1, 2, ...[3, 4]];

// REST OP, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 1 2 [3, 4, 5]

// using the Spread and the Rest OP
// ...otherFood took the rest of the elements of the array, in This case the whole starterMenu in to the otherFood
const [pizzaEl, , risottoEl, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
// The REST op collects all the array elements after the last variable
console.log(pizzaEl, risottoEl, otherFood); // Pizza Risotto ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

//////////////// THE REST OP IN OBJECTS /////////////////////////
// sat I declared in the object
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // {thu: {…}, fri: {…}}

// 2) F U N C T I O N S
// REST PARAMETER
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3); // 5
add(5, 3, 7, 2); // 17
add(8, 3, 3, 2, 5, 4, 2); // 25

// Using SPREAD OP
const x = [23, 5, 7];
add(...x); // 35

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach'); // mushrooms ['onion', 'olives', 'spinach']
restaurant.orderPizza('mushrooms'); // mushrooms []

/////// S H O R T   C I R C U I T I N G (&& AND ||) /////////////////////////
console.log('------- OR ------');
// The OR operator will return the first Truthy value, of ALL the operands, or the last value if ALL of the are Falsy.
// They can use ANY data type, return ANY data type, use short-circuiting
// SHORT-CIRCUITING = If the first value is a Truthy value, it will imediatly return that first value
// That's why it returned 3 bellow
console.log(3 || 'Jonas'); // 3
console.log('' || 'Jonas'); // Jonas
console.log(true || 0); // true
console.log(undefined || null); // null
// In OR '||' the result is TRUE if at lest one operand is true
console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello

// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // 10 (because numGuests dosen't exist, therefore it is Falsy)

const guests2 = restaurant.numGuests || 10;
console.log(guests2); // 10

console.log('------- AND ------');
// The AND Operator will return the First Falsy value, or the Last value if all of them are truthy.
// WORKS IN THE OPPOSITE WAY OF 'OR'
// AND THEN IT IMMEDIATELY RETURNS THAT VALUE WITHOUT EVEN EVALUATING THE SECOND OPERAND
// IF THE FIRST ONE IS FALSE, THEN IT MEANS THAT THE ENTIRE RESULT OF THE '&&' OPERATION IS FALSE
console.log(0 && 'Jonas'); // 0
// THE '&&' OPETATOR IS ONLY TRUE WHEN ALL THE OPERANDS ARE TRUE
console.log(7 && 'Jonas'); // Jonas
console.log('Hello' && 23 && null && 'Jonas'); // null

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('jalapenos', 'cheese');
}

restaurant.orderPizza &&
  restaurant.orderPizza('jalapennnnos', 'cheeeeese', 'fish', 'mustard');

////////////// N U L L I S H   C O A L E S C I N G   O P E R A T O R  (??) ////////////////////////

// OR
restaurant.numGuests = 0; // console.log(guestCorrect); = 0
// If numGuests = null/undefined, then it would short circuit on the second value 10
// restaurant.numGuests = 0; // console.log(guestCorrect); = 10
const guests = restaurant.numGuests || 10;
console.log(guests);

// NULLISH OP (null and undefined (NOT 0 or '') )
// For the NULLISH OP is if 0 and '' are truthy values
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

//////////////////////// L O G I C A L    A S S I G N M E N T    O P E R A T O R S //////////////////////////////
// The logical OR assignment operator, will assign a value to a variable, if that exact variable is Falsy right now!

const rest1 = {
  name: 'Carpi',
  // numGuests: 20,
  numGuests: 0, // ||= will return 10, because 0 is falsy
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// Old OR OP (With numGuests = 20)
// rest1.numGuests = rest1.numGuests || 10; // {name: 'Carpi', numGuests: 20}
// rest2.numGuests = rest2.numGuests || 10; // {name: 'La Piazza', owner: 'Giovanni Rossi', numGuests: 10}

// New OR OP (With numGuests = 20)
// OR OP ES2021 but more shorter version the the top one
// THE LOGICAL OR ASSIGNMENT OPERATOR (With numGuests = 20)
// rest1.numGuests ||= 10; // {name: 'Carpi', numGuests: 20}
// rest2.numGuests ||= 10; // {name: 'La Piazza', owner: 'Giovanni Rossi', numGuests: 10}

// THE LOGICAL NULLISH ASSIGNMENT OPERATOR (null or undefined) (With numGuests = 0)
rest1.numGuests ??= 10; // {name: 'Carpi', numGuests: 0}
rest2.numGuests ??= 10; // {name: 'La Piazza', owner: 'Giovanni Rossi', numGuests: 10}

// THE LOGICAL AND OPERATOR
// The Logical && OP assignes a valut to a variable, if it is currently Truthy.
// Old && OP
// rest1.owner = rest1.owner && '<ANONYMOUS>'; // undefined
// rest2.owner = rest2.owner && '<ANONYMOUS>'; // '<ANONYMOUS>'
// New && OP
rest1.owner &&= '<ANONYMOUS>'; // NOW OWNER OUTPUT just {name: 'Carpi', numGuests: 0}
rest2.owner &&= '<ANONYMOUS>'; // '<ANONYMOUS>'

console.log(rest1);
console.log(rest2);

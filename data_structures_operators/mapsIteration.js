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

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories); // Classicon Italiano; {thu: {...}, fri: {...}, sat: {...}}; [Italian, Pizzeria, Vegetarian, Organic]

///////////////////////////////////////////////   M A P S   I T E R A T I O N   //////////////////////////////////////////////////////////////////////

// WHEN CREATING A NEW MAP FROM SCRATCH DIRRECTLY IN THE CODE, THIS IS THE PREFERED WAY OF WRITING IT
// WHEN ADDING NEW ELEMENT PROGRAMMATICALLY USING CODE, THE 'SET' METHOD IS THE WAY TO GO

// Adding new elements to the map without using the SET Method
// I'm passing an Array that contains multiple Arrays,
// and in each of these Arrays the first position is gonna be the Key, second position is the Value
const question = new Map([
  // First entry of this Question Map
  ['question', 'What is the best programming language in the world ?'],
  // Options for the answer by their Number
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  // Then I need a Key for the correct answer
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try Again...'],
]);
console.log(question); // Map(7) {'question' => 'What is the best programming language in the world ?', 1 => 'C', 2 => 'Java', 3 => 'JavaScript', 'correct' => 3, …}

// Object.entries is structured in the same way when the first one is the Key, second one is the Value
// Hence there is an easy way to convert from Objects to Maps
// Convert object to map
console.log(Object.entries(openingHours)); // (3) [Array(2), Array(2), Array(2)]
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap); // Map(3) {'thu' => {…}, 'fri' => {…}, 'sat' => {…}}

// ITERATION
console.log(question.get('question'));
// Iteration is possible on Maps, because maps are also Iterables
// Hence the For Loop is available for them
// This is the same as for using Object.entries, because the Object is not Iterable
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`); // Answer 1: C, Answer 2: Java, Answer 3: JavaScript
}
// Getting the answer from the user
// And I need to convert this to a number
////const answer = Number(prompt('Your answer'));
// 3 Ways to do it

// 1
// if (answer === 3) {
//   console.log(question.get(true));
// } else {
//   console.log(question.get(false));
// }

// 2
// answer === 3
//   ? console.log(question.get(true))
//   : console.log(question.get(false));

// 3
//console.log(question.get(question.get('correct') === answer));

//console.log(answer);

// Sometimes we need to convert the Map back to an Array
// I need to build a new array, and unpack it with the Spread Operator, the 'question' Map
// The Result is bellow, it is this same data structure,
// (The Array Of Arrays) which is started in the CONST QUESTION in the begining
console.log([...question]); // (7) [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]

// There are Methods that we had on Arrays, 'entries', 'keys', 'values'
console.log(question.entries()); // 0: {"question" => "What is the best programming language in the world ?"}  ETC...
console.log(question.keys()); // 0: "question" ETC ...
console.log(question.values()); // 0: "What is the best programming language in the world ?" ETC...

// For more understanding, I added the Spread Operator
console.log(...[question.keys()]); // MapIterator {'question', 1, 2, 3, 'correct', …}
console.log(...[question.values()]); // MapIterator {'What is the best programming language in the world ?', 'C', 'Java', 'JavaScript', 3, …}

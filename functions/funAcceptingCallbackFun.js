'use strict';

//////////////////// FUNCTIONS ACCEPTING CALLBACK FUNCTIONS /////////////////////////////////////

// Function that going to replace all spaces in a word

const oneWord = function (str) {
  // I gonna select all / / spaces
  return str.replace(/ /g, '').toLowerCase();
};

// Function that is going to transform the first word of the Input String to Uppercase
const upperFirstWord = function (str) {
  // Destructuring by the first word and other remaining words
  const [first, ...others] = str.split(' ');
  // returning new Array that I will join
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-Order Function
// It takes in a Function that's why it is a Higher-Order Function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`); // JavaScript is the best!
  // Inside here upperFirstWord = fn
  console.log(`Transformed string: ${fn(str)}`); // JAVASCRIPT is the best!
  // Functions have Mehtods and Properties one of them is the Name Property
  // Taking 'fn' Parameter which is the Function that the 'transformer' Higher-Order Functions gets as an Input.
  // So on the it can read the 'name' Property
  console.log(`Transformed by: ${fn.name}`); // Transformed by: upperFirstWord
};

// Calling the Higher-Order Function
// I want this Function is to transform the String using the upperFirstWord Function
// I don't call the upperFirstWord Function below, only passing the Function Value itself
// transformer Function is the one who is going to call it

// upperFirstWord, oneWord, fn are callBackFunctions, that JS will call later
transformer('JavaScript is the best!', upperFirstWord);

// Trying the same with other Function
transformer('JavaScript is the best!', oneWord);

// simple example of the callBack Function
// addEventListener Function is like transformer Function
// high5 is like oneWord or upperFirstWord Function
// JS uses callbacks all the time!
const high5 = function () {
  console.log('High5!');
};
document.body.addEventListener('click', high5);

// same thing with passing the Funtion in to forEach Method Example:
['Max', 'Vitas', 'Thomas'].forEach(high5); // console.log will high5 3 times

// WHY CALLBACK FUNCTIONS ARE SO HELPFUL?
// 1. It makes it easy to split up the code, into more reusable and interconnected parts.
// 1. Example oneWord(), upperFirstWord()
// 2. The second more important advantage, the fact that the callBack Functions allow us to create Abstraction
// 2. What I did with oneWord, upperFirstWord, transformer Functions is that I created this way the level of Abstraction
// 2. Abstraction is really important in programming, means that (We hide the detail of some code implementation because we don't really care about all that detail.)
// 2. And this allows to think about problems at a higher more Abstract level
// 2. Example the 'transformer' Function does not care at all how the String is transformed, it only transformes the string, but it dosent care how to do it.
// 2. Instead I have abstracted this code away into other Functions, so transformer() is basically delefating the string transformation, to the other Lower Level Functions (oneWord, upperFirstWord)

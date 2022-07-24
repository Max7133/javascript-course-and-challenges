'use strict';

/////////////////////////////////////////////////   P R O T O T Y P A L   I N H E R I T A N C E   O N   B U I L T - I N   O B J E C T S   /////////////////////////////////////////////////

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
const max = new Person('Max', 1988);
console.log(max);

//// Prototypes
console.log(Person.prototype); // {constructor: ƒ}, INSIDE WE WILL FIND THIS METHOD THAT I DEFINED BELLOW, calcAge: ƒ ()

// Method on Prototype
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear); // Prototype Property of the Constructor Function
};
max.calcAge();

console.log(max.__proto__); // {calcAge: ƒ, constructor: ƒ} (The Prototype of 'max' Object is the Prototype Property of the Constructor Function)
console.log(max.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(max)); // true
console.log(max.__proto__.isPrototypeOf(max)); // true

// Person.prototype is NOT the Prototype of Person!!!
console.log(Person.prototype.isPrototypeOf(Person)); // false

// We can also set PROPERTIES on the Prototype
Person.prototype.species = 'Homo Sapiens';
console.log(max); // Person {firstName: 'Max', birthYear: 1988}, INSIDE __proto__:, species: "Homo Sapiens"
console.log(max.species); // Homo Sapiens
console.log(max.hasOwnProperty('firstName')); // true
console.log(max.hasOwnProperty('species')); // false

//// THE PROTOTYPE CHAIN
// This is the Property of 'max' which is exactly the Prototype Property of 'Person' (an Object)
console.log(max.__proto__); // {species: 'Homo Sapiens', calcAge: ƒ, constructor: ƒ}

// Moving UP in the Prototype Chain (and looking for the Prototype of Max's Prototype)
// The RESULT is going to be the Prototype Property of Object
console.log(max.__proto__.__proto__); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
// This is the Reason why we can do this: console.log(max.hasOwnProperty('firstName')); // true

// Checking the Prototype of the Prototype of the Prototype
// SAME AS Object.prototype (top of the Prototype Chain!)
console.log(max.__proto__.__proto__.__proto__); // null (that's because Object.prototype is usually the TOP of the Prototype Chain)

// person.prototype itself has a Constructor Property, that will point back to the Person itself.
console.log(Person.prototype.constructor); // ƒ (firstName, birthYear) { this.firstName = firstName; this.birthYear = birthYear; }
// Here we get the Function itself.

// If we want to INSPECT the FUNCTION ITSELF, then we use console.dir
console.dir(Person.prototype.constructor); // ƒ Person(firstName, birthYear)

//// THE PROTOTYPE OF ARRAYS
const arr = [3, 6, 6, 5, 6, 9, 9]; // Just like in Objects, new Array === []
console.log(arr.__proto__); // [constructor: ƒ, at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, …]
// It will contain all of the Array Methods, and other stuff, this is the reason why all the Arrays get access to all of these Methods.
// So each Array does of course NOT CONTAIN all these Methods, instead, each Array WILL INHERIT these Methods from its Prototype.

// We can also check that this Prototype has got to be EXACTLY 'Array' which is the Constructor Function.prototype.
// The Prototype Property of the Constructor 'Array' is gonna be the Prototype of all the Objects created by that Constructor 'arr.__proto__'.
console.log(arr.__proto__ === Array.prototype); // true

// Now we are back to having Object.prototype
console.log(arr.__proto__.__proto__); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
// Because the Property itself here 'arr.__proto__' is an Object, and so any Object has access to all of these Methods.

// Any Array Inherits ALL THEIR METHODS FROM IT'S PROTOTYPE, therefore we can use this to Extend the Functionality of Arrays even further.
// Here we can add ANY New Method to this Prototype and ALL the Arrays will then Inherit it.
// Creating a Method which returns ALL the Unique Elements of an Array.
Array.prototype.unique = function () {
  // To get the 'unique' Value of an Array, I'm creating a new Set and pass the Array in there.
  return [...new Set(this)];
};
// This will return an Array with only Unique Values (Not Same Values)
console.log(arr.unique()); // (4) [3, 6, 5, 9]
// I added a New Method to the Prototype Property of the Array Constructor
// However, what I did just here (extending the Prototype) of a built-in Object is generally NOT A GOOD IDEA.
// If I'm working on a small Project alone, that I could do this, but not often for multiple reasons.
// 1st Reason: Next version of JavaScript might ADD a Method with the SAME NAME that I added, like this 'unique' one.
// and it might work in a different way, and then my code will then use this New Method, and it WILL BREAK my code.
// 2nd Reason: When working with a team of developers, this is really gonna be a bad idea
// because if multiple developers implement the same Method with a Different Name, then that's just going to create so many Bugs that it's just not worth doing this.

//// THE PROTOTYPE OF FUNCTIONS
// Logging some random Function
// The Function itself is also an Object, therefore it also has a Prototype.
// In this case the Prototype will then contain the Methods that I have used previously on Functions, e.g. apply(), bind(), call() and many more.
// And so this is the reason why we can actually call Methods on Functions, it's because they are Objects and Objects have Prototypes, and in this case, this Function Prototype
console.dir(x => x + 1);

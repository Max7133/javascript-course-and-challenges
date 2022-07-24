'use strict';

/////////////////////////////////////////////////   P R O T O T Y P E S   /////////////////////////////////////////////////

// This 'new' is a very special Operator, what it does is to call this Function here, and a whole lot more than just that.
// So Behind The Scenes, there have been 4 Steps.
// 1. A New Empty Object is created.
// 2. The Function is called (in this Function call the THIS Keyword will be set to this newly created Object)
// 3. This newly created Empty Object is linked to a Prototype
// 4. The Object that was created in the beginning is then Automatically Returned from the Constructor Function,
// that Empty Object from the beginning, but at this point the Object no longer needs to be Empty (and this is the TRICK of making the Constructor Function work.)

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Adding Method to the Objects (will work, but BAD PRACTICE)
  // NEVER CREATE A METHOD INSIDE A Constructor Function!!!
  // If there were thousands or even more Person Objects using this Constructor Function
  // What would happen, is that each of these Objects would have this Function here, so if we had 1000 Objects, we would essentially create a 1000 copies of this Function.(BAD FOR PERFORMANCE)
  /*   this.calcAge = function () {
      console.log(2037 - this.birthYear);
    }; */
}; // INSTEAD, to Solve this Problem, we gonna use Prototypes and Prototype Inheritance

const max = new Person('Max', 1988);
console.log(max);

//// Each and EVERY FUNCTION in JavaScript AUTOMATICALLY has a Property called Prototype (and that includes Constructor Functions)
//// Every Object that is created by a certain Constructor Function, WILL GET ACCESS TO ALL THE METHODS AND PROPERTIES that we Define on the Constuctors Prototype Property.

//// Prototypes
console.log(Person.prototype); // {constructor: ƒ}, INSIDE WE WILL FIND THIS METHOD THAT I DEFINED BELLOW, calcAge: ƒ ()

// Adding a METHOD to this Prototype Property (RIGHT WAY)
// .prototype is actually an Object, that's why I can call the calcAge Function on it.
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear); // Prototype Property of the Constructor Function
};
// Now This will work (Now I can use this calcAge Method here, on the 'max' Object, even though it is not really on the Object itself.)
max.calcAge(); // 49
// This works because ANY Object always has access to the Methods and Properties from its Prototype
// and the Prototype of 'max' is Person.prototype

// and we can confirm that, because each Object has a Special Property '__proto__'
console.log(max.__proto__); // {calcAge: ƒ, constructor: ƒ} (The Prototype of 'max' Object is the Prototype Property of the Constructor Function)

// So the Prototype of the Jonas Object is essentially the Prototype Property of the Constructor Function.
// Person.prototype here, is actually NOT the Prototype of Person, instead it is what's gonna be used as the Prototype of ALL the Objects that are created with the Person Constructor Function.
console.log(max.__proto__ === Person.prototype); // true

// There are Other built in Methods that we can use to PROVE THIS.
// On any Object, e.g. Object.prototype, we can test if this is a Prototype of Another Object.
console.log(Person.prototype.isPrototypeOf(max)); // true
console.log(max.__proto__.isPrototypeOf(max)); // true

// Person.prototype is NOT the Prototype of Person!!!
console.log(Person.prototype.isPrototypeOf(Person)); // false

// From UPPER Step 3 of the New Operator
// 3. This newly created Empty Object is linked to a Prototype (this Step 3, Will Create this '__proto__' Property)
// the New Operator also creates this __proto__ Property and it sets its Value to the Prototype Property of the Function that is being called.
// it sets the __proto__ Property on the Object to the Prototype Property of the Constructor Function, e.g. Person.prototype
// And this is how JavaScript knows internally that the 'max' Object is connected to Person.prototype

// We can also set PROPERTIES on the Prototype
Person.prototype.species = 'Homo Sapiens';
console.log(max); // Person {firstName: 'Max', birthYear: 1988}, INSIDE __proto__:, species: "Homo Sapiens"
// Now I can do this, and 'max' Object will then INHERIT this Property from the Prototype
console.log(max.species); // Homo Sapiens

// However, after taking a look on the console.log on the 'max' Object
// the Property 'species' is not really directly in the Object (so it's not its OWN Property)
// OWN Properties are only the ones that are declared DIRECTLY ON THE OBJECT ITSELF. (NOT including the Inherited Properties)
// There is a way to check this
console.log(max.hasOwnProperty('firstName')); // true
console.log(max.hasOwnProperty('species')); // false
// That's because this 'species' Property is not reallu inside of the 'max' Object, it simply has access to it because of its Prototype.
// Because it's in the Prototype Property of Person -> Person.prototype

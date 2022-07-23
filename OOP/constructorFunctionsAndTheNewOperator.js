'use strict';

/////////////////////////////////////////////////   C O N S T R U C T O R   F U N C T I O N S   A N D   T H E   N E W   O P E R A T O R   /////////////////////////////////////////////////

///////// CONSTRUCTOR FUNCTIONS
//// We can use Constructor Functions to build an Object using a Function.
//// We call a Constructor Function with the New Operator
//// In OOP there is a convention, that Constructor Functions always start with a Capital letter.
//// An Arrow Function will NOT WORK as a Function Constructor (because Arrow Functions DO NOT have their own THIS KEYWORD) and we need that.

// This Constructor Function is gonna produce an Object, in this case for a Person
// In the End of this Function, the THIS Keyword will be Returned
// Whatever we add to that Empty Object, will then be Returned from the Function
// And that returned Object, is gonna be the Object that I'm building here
const Person = function (firstName, birthYear) {
  // I'm taking the 'firstName' Parameter (the Value that I receive) and then creating a Property on the THIS Keyword with the same name and then set it to that Value.
  // Instance Properties (because the Properties 'firstName' & 'birthYear' will be available on all the Instances that are created through this Constructor Function)
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
console.log(max); // Person {firstName: 'Max', birthYear: 1988}
// This 'new' is a very special Operator, what it does is to call this Function here, and a whole lot more than just that.
// So Behind The Scenes, there have been 4 Steps.
// 1. A New Empty Object is created.
// 2. The Function is called (in this Function call the THIS Keyword will be set to this newly created Object)
// 3. This newly created Object is linked to a Prototype
// 4. The Object that was created in the beginning is then Automatically Returned from the Constructor Function,
// that Empty Object from the beginning, but at this point the Object no longer needs to be Empty (and this is the TRICK of making the Constructor Function work.)

// Now I can use this Constructor Function 'Person()' to create as many different Objects as I want.
const thomas = new Person('Thomas', 1999);
const vitas = new Person('Vitautas', 1992);
console.log(thomas, vitas);

// In Classical OOP, an Object created from a Class is called an Instance
// We didn't technically create a Class here (JavaScript doesn't really have Classes) in sense of traditional OOP.
// however, we did create 3 Objects from a Constructor Function, and Constructor Functions have been used since the beginning JS to kind of simulate Classes.
// So here we can say that 'max' here is an Instance of Person, same goes for 'thomas' & 'vitas'

// There is an Operator to test for that.
console.log(max instanceof Person); // true

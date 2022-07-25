'use strict';

/////////////////////////////////////////////////   E S 6   C L A S S E S   /////////////////////////////////////////////////
//// Classes in JavaScript are just a Special Type of Functions, although we use the Class Keyword here,
//// behind the scenes, Classes are still Functions, and therefore, we have Class Expressions and Class Declarations.

// Class Expression
//const PersonCl = class {};

// Class Declaration
class PersonCl {
  // Inside the Class, the 1st thing I need to do is to add a Constructor Method
  // This Constructor works in a similar way as a Constructor Function, but this one is actually a Method of this Class
  // Just like in Constructor Functions, I pass in Arguments for the Properties that I want the Object to have.
  constructor(firstName, birthYear) {
    // the act of creating a New Object, also works in the exact same way as before (using a 'new' Operator)
    // just like before, the THIS Keyword here inside of Constructor will also be Set to the newly created Empty Object
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // All of the Methods that I write in the Class (Outside of the 'constructor') will be on the Prototype of the Objects (and NOT on the Objects themselves.)
  // Adding a Method (just like a Regular Function)
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2022 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  } // Will work the Exact same way as the bellow e.g.
}

// so therefore, whenever I create a New Object (like a New Instance using the New Operator) this Constructor will automatically be called.
const vitas = new PersonCl('Vitautas', 1992); // when I create a New Instance here, then it is the 'constructor' that is gonna be called,
//and that will return a New Object, and then that will be stored here into 'vitas'
console.log(vitas); // PersonCl {firstName: 'Vitautas', birthYear: 1992}
vitas.calcAge(); // 30

// PersonCl here acts just like any other Function Constructor, with the only difference that this all looks a little bit nicer.
// With this Syntax, I don't have to manually mess with the Prototype Property.
// All I have to do is to write the Methods there (Inside the Class) but Outside of the Constructor, and then they will be automatically be added to the Prototype Property of the Class basically.
console.log(vitas.__proto__ === PersonCl.prototype); // true

// Adding a Method MANUALLY to the Prototype
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
vitas.greet(); // Hey Vitautas
// This is PROOF that the Class really just hides the true nature of Prototypal Inheritance in JavaScript

// IMPORTANT:
// 1st: Classes are NOT Hoisted. Even if they are Class Declarations. So Function Declarations, ARE Hoisted, which means we can use them BEFORE they are declared in the Code. (WITH Classes that DOESEN'T WORK!)
// 2nd: Just like Functions, Classes are also First-Class citizens. Means is that we CAN PASS THEM into Functions and RETURN them from Functions. (Because Class is a Special Type of Function behind the scenes.)
// 3rd: The BODY of a Class is ALWAYS EXECUTED IN STRICT MODE. (Even if I didn't Activate it for the Entire Script, all the Code that is in the Class, WILL VE EXECUTED IN STRICT MODE.)

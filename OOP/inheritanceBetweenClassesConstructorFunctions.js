'use strict';

/////////////////////////////////////////////////   I N H E R I T A N C E   B E T W E E N   ' C L A S S E S '   C O N S T R U C T O R   F U N C T I O N S   /////////////////////////////////////////////////

//// Functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

// Creating a Constructor Function for the Student
// Usually we want a Child Class to have the SAME Functionality as the Parent Class, but with some Additional Functionality.
// So usually we pass in the Same Arguments, but then also some Additional ones.
const Student = function (firstName, birthYear, course) {
  /// FIX
  // I need to Manually set the THIS Keyword as well.
  // So I'm calling the Function and at the same time setting the THIS Keyword inside the Function
  // The Call Method will call this Function, and I will be able to specify the THIS Keyword here as the 1st Argument in this Function.
  // I want the THIS Keyword inside the Constructor Function (const Person), to be the THIS Keyword inside this Function
  Person.call(this, firstName, birthYear);
  /// ERROR
  //Person(firstName, birthYear); // WON'T WORK !!!
  // The Problem here is that I'm now actually calling this Person Constructor as a Regular Function Call (I'm not using the New Operator to call it)
  // Therefore this Function Call here is simply a Regular Function call, and in a Regular Function call, the THIS Keyword is set to Undefined.
  // that's why I got the Error here // Cannot set properties of undefined (setting 'firstName')
  this.course = course;
};

/// THIS NEEDS TO BE ONLY HERE
// and with this, the Student.prototype Object is now an Object that Inherits from Person.prototype
// I had to create this connection here, BEFORE I ADD ANY MORE METHODS to the Prototype Object of Student
// That's because Object.create will Return an Empty Object, and so at this point, Student.prototype IS EMPTY.
// and so then onto that Empty Object, I can add Methods like // Student.prototype.introduce = function () {}
Student.prototype = Object.create(Person.prototype);
// If I did it the other way around, so if this was after the introduce(), then Object.create would OVERWRITE that Method/s,
// that I already added to the Prototype Object of Student.

// Adding a Method
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const thomas = new Student('Thomas', 1999, 'Computer Science');
// Calling the introduce Method
thomas.introduce(); // My name is Thomas and I study Computer Science
thomas.calcAge(); // 23

// It was Person, but it SHOULD BE Student
//console.dir(Student.prototype.constructor); // Person(firstName, birthYear)
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // Student(firstName, birthYear, course)

console.log(thomas.__proto__); // Person {introduce: ƒ, constructor: ƒ}
console.log(thomas.__proto__.__proto__); // {calcAge: ƒ, constructor: ƒ}

console.log(thomas instanceof Person); // true
console.log(thomas instanceof Student); // true
console.log(thomas instanceof Object); // true

'use strict';

/////////////////////////////////////////////////   I N H E R I T A N C E   B E T W E E N   ' C L A S S E S ' :   E S 6   C L A S S E S   /////////////////////////////////////////////////

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullname = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullname;
  }

  // Static method
  static hey() {
    console.log('Hey there!');
  }
}

// The Class Syntax HIDES ALOT OF THE DETAILS that are actually happening Behind The Scenes,
// because Classes are just a LAYER of Abstraction over Constructor Functions,
// BUT THEY DO WORK IN THE SAME WAY as Constructor Functions
// and Inheritance between Classes behind the scenes is the same like in Constructor Functions

// To implement Inheritance between ES6 Classes, I need 2 things
// 1st: Extent Keyword
// 2nd: Super Function

// LINKING CLASSES
// So to make this StudentCl Class Inherit from the PersonCl Class, all I need to write is 'extends' PersonCl
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // I DON'T NEED THIS, like in Constructor Function
    //PersonCl.call(this, fullName, birthYear)
    // INTEAD I NEED A SUPER FUNCTION (Super is basically the Constructor Function of the Parent Class)
    // here I'm passing the Arguments for the Constructor of the Parent Class
    super(fullName, birthYear); // ALWAYS NEEDS TO HAPPEN FIRST!
    // That's because this call to the Super Function is responsible for creating the THIS Keyword in this Subclass
    // Without this, this.course = course; WON'T BE POSSIBLE (AND ADDING this.course = course & A 3rd PARAMETER IS NOT MANDATORY)
    this.course = course;
  }

  // Method
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // OVERRIDING calcAge()
  // This calcAge() is Shadowing the one that is in the Parent Class.
  calcAge() {
    console.log(
      `I'm ${
        2022 - this.birthYear
      } years old, but as a student I feel more like ${
        2022 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2002, 'Computer Science');

// Calling the Method
martha.introduce(); // My name is Martha Jones and I study Computer Science
// Calling the Method that has been OVERRIDDEN by the Child Class
martha.calcAge(); // I'm 20 years old, but as a student I feel more like 30

// If I did This (IT WOULD STILL WORK)
// Then I wouldn't need Any Constructor Function at all.
// In this case the Super Function would AUTOMATICALLY be called with all the Arguments that are passed into this Constructor

// class StudentCl extends PersonCl {}

//const martha = new StudentCl('Martha Jonas', 2012); // StudentCl {_fullname: 'Martha Jonas', birthYear: 2012}

// IF I DO NOT NEED ANY NEW PROPERTIES, THEN I DON'T NEED TO BOTHER WRITING A CONSTRUCTOR METHOD IN THE CHILD CLASS

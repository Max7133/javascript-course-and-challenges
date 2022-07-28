'use strict';

/////////////////////////////////////////////////   I N H E R I T A N C E   B E T W E E N   ' C L A S S E S ' :   O B J E C T .   C R E A T E   /////////////////////////////////////////////////

const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

// Making 'Student' Inherit directly from PersonProto
// Creating an Object that will be the Prototype of Students.
const StudentProto = Object.create(PersonProto); // the PersonProto Object is in turn the Prototype of StudentProto
// Therefore, PersonProto is a Parent Prototype of Jay, which means that it's in its Prototype Chain

// Adding 'init' Method to StudentProto
StudentProto.init = function (firstName, birthYear, course) {
  // Setting the THIS Keyword to the THIS Keyword in this Method
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

// Adding 'introduce' Method to StudentProto
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto); // the StudentProto Object is now the Prototype of the Jay Object.
// Calling 'jay' with Init Method
jay.init('Jay', 2000, 'Computer Science');
// Calling 'jay' with Introduce Method
jay.introduce(); // My name is Jay and I study Computer Science
// Calling 'jay' with INHERITED from PersonProto Method
jay.calcAge(); // 22

'use strict';

/////////////////////////////////////////////////   O B J E C T . C R E A T E   /////////////////////////////////////////////////
//// Object.create is a 3rd way of implementing Prototypal Inheritance or Delegation.
//// Using a Function called Object.create, works in a pretty different way than Constructor Functions and Classes work.
//// With Object.create, there is still the idea of Prototypal Inheritance
//// However, there are NO Prototype Properties involved, also NO Constructor Functions, and NO New Operator.
//// So instead, we can use Object.create to Manually set the Prototype of an Object, to ANY other Object that we want.

// Creating an Object that I want to be the Prototype of ALL the Person Objects.
const PersonProto = {
  // That's all the Methods I want the Person Objects to Inherit, so I put them in the Prototype
  calcAge() {
    console.log(2022 - this.birthYear);
  },
  // Creating a new Method
  // This looks like a Constructor Function, however, this has Nothing to do with it, it also DOESN'T HAVE the New Operator to call this.
  // can be ANY NAME instead of INIT
  init(firstName, birthYear) {
    this.firstName = firstName; // here the THIS Keyword will also point to the Mark Object now, because I explicitly called INIT on Mark.
    this.birthYear = birthYear;
  },
};
// Creating a Person Object with PersonProto Object as the Prototype
// For that I need to create Object.create() and here I pass in the Object that I want to be the Prototype of the New Object.
const thomas = Object.create(PersonProto); // This will now Return a brand New Object, that is Linked to the Prototype that I passed in here.
// So, before 'thomas' was an Empty Object, and it will be linked to this PersonProto Object, which will be its Prototype
console.log(thomas); // {}, For now it is Empty, but now I already have the Prototype, and in there, there is calcAge()
// Adding Properties on the Object (like in ANY Object Literal)
thomas.name = 'Thomas';
thomas.birthYear = 1999;
thomas.calcAge(); // 23
// Just like before we implemented Prototypal Inheritance, but in a completely different way.

console.log(thomas.__proto__); // {calcAge: ƒ}, This is now Exactly the Object that I upper specified 'PersonProto'
console.log(thomas.__proto__ === PersonProto); // true

// Creating ANOTHER Person Object
const mark = Object.create(PersonProto);
// But now, in order to Set Properties on this Object, I will do it in a BETTER WAY than previous example with Thomas
// now I will create an Object Programmatically
mark.init('Mark', 1998);
mark.calcAge();

// Summary: Object.create() creates a NEW Object, and the Prototype of that Object will be the Object that I passed in.

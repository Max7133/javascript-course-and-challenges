'use strict';

/////////////////////////////////////////////////   S T A T I C   M E T H O D S   /////////////////////////////////////////////////
//// Good e.g. to understand what a Static Method actually is, is the build in Array.from()
//// Array.from() converts any Array like structure to a Real Array.
//Array.from(document.querySelector('h1')); // querySelector DOESN'T RETURN ANY NODE LIST
const h1 = Array.from(document.querySelectorAll('h1'));
console.log(h1); // [h1]
// So Array.from() is really a Method that is attached to the Array Constructor
// So we could NOT use the Array.from() on an Array. [1, 2, 3].from() = ERROR .from IS NOT A FUNCTION
// That is because this .from() here is really attached to the Entire Constructor (the Array Constructor) and NOT to the Prototype Property of the Constructor.
// Therefore all tha Arrays do NOT INHERIT THIS METHOD (because its NOT on their Prototype) its simply attached to the Constructor itself.
// Array.from() is basically just a Simple Function, but its a Function that's attached to the Array Constructor.
// The reason for that is simply, so that developers know that it is related to Arrays.
// We also say that the .from() Method is n the Array Name Space.
// We used that term before for some Methods in the Number and in the Internationalization Name Space. e.g. Number.parseFloat() , that's the Same Thing.
// Number.parseFloat() Method is another Static Method and its Static on the Number Constructor
// so its NOT available on Numbers, but only on this Number Constructor

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
const max = new Person('Max', 1988);
console.log(max);

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //// Instance Methods
  //// Methods will be added to .prototype property
  calcAge() {
    console.log(2022 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);

    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
  //// Static Methods
  //// Adding a Static Method to the Class
  static hey() {
    console.log('Hey there!');
    console.log(this); // This time the THIS Keyword points to the Entire Class. lass PersonCl {constructor(fullName, birthYear) {this.fullName = fullName;this.birthYear = birthYear;}
  }
}
const vitas = new PersonCl('Vitautas Green Onion', 1992);

//// Adding a Static Method to the Person Object (Constructor Function)
Person.hey = function () {
  console.log('Hey there!');
  // Taking a look at the THIS Keyword
  // This is the entire Constructor Function, because that is exactly the Object that is calling the Method.
  // Whatever Object is calling the Method, will be the THIS Keyword inside of that Function.
  console.log(this); // ƒ (firstName, birthYear) {this.firstName = firstName; this.birthYear = birthYear;}
};

// Calling the Static Method
Person.hey(); // This one is NOT Inherited
PersonCl.hey();
// These Static Methods are NOT available on Instances, sometimes they are usefull to implement some kind of Helper Function about a Class or Constructor Function.

// Just like we CANNOT call the from() on an Array
//max.hey(); // ERROR (Because it is NOT in the Prototype of the 'max' Object)
// so there is NO WAY that the 'max' Object could inherit it

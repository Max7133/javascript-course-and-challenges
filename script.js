'use strict';

//SCOPES

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;

      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reassingning outer scope's variable
      output = 'NEW OUTPUT';

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      console.log(add(2, 3)); // WILL REACH
    }
    //console.log(str);
    console.log(millenial);
    //console.log(add(2, 3)); WILL NOT REACH
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);

// HOISTING

// WITH VARIABLES
console.log(me); // UNDEFINED
//console.log(job); // TDZ ERROR (TEMPORAL DEAD ZONE)
//console.log(year); // TDZ ERROR (TEMPORAL DEAD ZONE)

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// WITH FUNCTIONS (SAME PRINCIBLE WITH LET AND CONST)
console.log(addDec(2, 3));
//console.log(addExpr(2, 3));
console.log(addArrow);
//console.log(addArrow(2, 3));

function addDec(a, b) {
  return a + b; // WILL GET OUTPUT
}

const addExpr = function (a, b) {
  return a + b; // TDZ ERROR (TEMPORAL DEAD ZONE)
};

var addArrow = (a, b) => a + b; // TDZ ERROR (TEMPORAL DEAD ZONE) undefined is not a function

// Mistake expample
console.log(numProducts);

// if zero it will deleteShoppingCart();
if (!numProducts) deleteShoppingCart();
console.log(numProducts);

var numProducts = 10;
console.log(numProducts);

function deleteShoppingCart() {
  console.log('All products deleted!');
}

var x = 1; // true, variables created with VAR will create a property on the GLOBAL window object
let y = 2; // false (won't create a property in the GLOBAL window object)
const z = 3; // false (won't create a property in the GLOBAL window object)

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

// THIS KEYWORD

console.log(this);

// In function
const calcAgeThis = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // in regular fun call like calcAgeThis(1991); it will show undefined in 'strict mode'
};
calcAgeThis(1991);

// In arrow function
const calcAgeThisArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // it will point to parent scope, global window object
};
calcAgeThisArrow(1988);

// In method
const jonas = {
  year: 1991,
  calcAgeM: function () {
    console.log(this); // it will point to the whole jonas object
    console.log(2037 - this.year); // 2037 - jonas.year(which is 1991)
    //After that I don't need to type the year in, for example jonas.calAgeM(1991); all I need is jonas.calcAgeM();
  },
};
jonas.calcAgeM();

// THIS keyword will point to that object that is calling the Method, that means that..
// THIS keyword will not simply point at the object in where we wrote the method
// example matilda
const matilda = {
  year: 2017,
};

matilda.calcAgeM = jonas.calcAgeM; // I borrowed calcAgeM method from jonas obj, so I won't have to write it again in the same way
matilda.calcAgeM(); // 2037 - 2017 = 20, it was correct, THIS keyword always points to the object that is calling the method
// I call matilda here from borrowed calcAgeM method
// even though the method CalcAgeM is written inside the jonas obj, the THIS keyword will still point to matilda, if it is matilda who is calling the method
const f = jonas.calcAgeM;
//f(); // THIS keyword in the same lines as the other two, lines 114, 115, exactly here will be undefined, f dosen't have year, that's why the result is UNDEFINED (undefined.year does not exist)

/////////////////////////////////////////////////////////////////////////////////

//// var firstName = 'Vitas'; // after all that we got below, if we use var and set it to Vitas, VAR will create a property with the name of I set, this case is Vitas
// that's why we should not use var, or arrow functions as a Method with THIS keyword, or as a method in general !!!!!!
// arrow function sets THIS to UNDEFINED because THIS points to WINDOW object
// VAR afterwards can create a property in that WINDOW object, in our case it creates firstName: = 'Vitas',

// this is not a code block(the whole max object), its an object literal, its how we defined objects (all of this is in the GLOBAL SCOPE) and that is the WINDOW OBJECT
// here calcAgeMax method I wrote inside max object, but THIS keyword will not simply point at the object in which I wrote the method (here in max object)
// max object was calling the calcAgeMax method, that's why THIS keyword, points at max object

const max = {
  firstName: 'Max',
  year: 1991,
  calcAgeMax: function () {
    console.log(this);
    console.log(2037 - this.year);

    // PITFALL OF THIS KEYWORD, WHEN WE HAVE A FUNCTION INSIDE OF A METHOD

    // SOLUTION 1 (PRE ES6)
    // to use THIS keyword in a fun inside a method, we need to store it in SELF
    // const self = this; // self or that (SELF USED IN PRE ES6)
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // SOLUTION 2 (using an Arrow Function)
    // Arrow Function will use the THIS keyword from its parent scope, that will be the calcAgeMax method, and there the THIS keyword is the max object
    // Arrow Function inherits the THis keyword from the parent scope
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial(); // this is regular fun call, even tho its inside the method, the rule says that inside a regular fun call, the THIS keyword must be UNDEFINED
    // same if this function was outside of this method
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
max.greet();
max.calcAgeMax();
console.log(this.firstName); // is also UNDEFINED, if we try to access a property that dosen't exist on a certain object, we dont get an ERROR, we get UNDEFINED
// there is now firstName in the WINDOW object, thats why we get UNDEFINED

// FUNCTIONS also get access to an ARGUMENTS keyword (only in regular functions (FUN EXPRESSIONS AND DECLARATIONS))
// ARGUMENTS KEYWORD

const addExprTwo = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExprTwo(2, 5);
addExprTwo(2, 5, 8, 12);

// IN THIS ARROW FUN IT WILL HAVE AN ERROR
var addArrowTwo = (a, b) => {
  console.log(arguments);
  return a + b;
};
//addArrow(2, 5, 8);

///HOW PRIMITIVE TYPES(Number, String, Boolean, Undefined, Null, Symbol, BigInt) & REFERENCE TYPES (Objects like Object literal, Arrays, Functions etc..) ARE STORED IN MEMORY///

//PRIMITIVES (number, str, booleans etc.) are stored in the Call Stack, and with that they are stored in the EXECUTION CONTEXTS in which they are declared
// age is equal to specific Memory Address 0001, that hold the value of 30
let age = 30;
// oldAge is still in the specific Memory Address 0001, that hold the value of 30
let oldAge = age;
// age now changed and is equal to specific Memory Address 0002, that hold the value of 31
age = 31;
console.log(age);
console.log(oldAge);

const meTwo = {
  name: 'Max',
  age: 30,
};

// I'm not copying the object here, I'm really just creating a new variable that points to the exact same object.
const friend = meTwo;
// it will change for both meTwo and friend to age = 27, even though I only setted 27 to friend.age
// 1st reason OBJECTS STORED IN THE HEAP
// 2st reason meTwo points to the different address in the heap D30F, and not the ones from before in the Call Stack
// 3rd reason meTwo also creates a new Memory Address 0003 in the call stack, and stores HEAPS ADDRESS D30F As A Value in Call Stack (and the Value is a whole object) (thats the reason why reference types)

// friend will now be equal to 27, but friend is also meTwo, and I did not just change the value, the value is = the Heaps Address in the call stack D30F
// and that address has the Object value, which I set to 27, and since its the same object, they both now have 27 in the value in the Heap, but the Call Stack remains unchanged with their same Value = D30F (object address in heap)
// even thow CONST friend, we still can change the Value because we changing the Value in the Heap, and not the value in the Call Stack that has a Value set to Address identifier D30F for the heaps location

friend.age = 27;
console.log('Friend:', friend); // 27
console.log('Max', meTwo); // 27

/////PRACTICE TIME
// Primitive types
let lastNameP = 'Williams';
let oldLastNameP = lastNameP;
lastNameP = 'Davis';
console.log(lastNameP, oldLastNameP); // Davis, Williams

// Reference types
const jessica = {
  firstNameP: 'Jessica',
  lastNameP: 'Williams',
  age: 33,
};

// SAME RECAP AS BEFORE
// when I attempted to copy the original Jessica object, it did not create a new object in the HEAP, it's just another variable in the Call Stack, which holds the reference to the original object.
// both of these two variables point to exactly the same memory address in the HEAP, that's because in the CALL STACK they both hold the same Memory Address Reference
// if I change a property on marriedJessica, it will also change Jessica itself
// thats why we can change CONST, what actually needs to be CONSTANT is the VALUE in the CALL STACK, and in the CALL STACK the VALUE only holds the REFERENCE, which I'm not actually changing!
// the only thing I'm changing is the stored same for both of them Object in the HEAP (THAT HAS NOTHING TO DO WITH CONST OR LET, that only conserns the VALUE in the CALL STACK)
const marriedJessica = jessica;
marriedJessica.lastNameP = 'Davis';
console.log('Before marriage: ', jessica); // Davis
console.log('After marriage:', marriedJessica); // Davis

// I can't assign a new object to marriedJessica
// Since its a CONST, I cannot change that value in the Call Stack with a new Address for HEAP
// Completely changing the object, so assigning a ne object to it, is COMPLETELY DIFFERENT that just changing a Property
// marriedJessica = {}; // Will NOT work, because this New Object will be stored at a different position in memory

// Copying objects

const jessica2 = {
  firstNameP: 'Jessica',
  lastNameP: 'Williams',
  age: 33,
  family: ['Alice', 'Bob'],
};
// this will create, COPY a new object with all of it's properties
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastNameP = 'Davis';

console.log('Before marriage: ', jessica2); // Williams
console.log('After marriage:', jessicaCopy); // Davis

// CONS if I have an object inside of an object, then this inner object will actually still be the same. (It will still point in the same place in memory)
// now I modify that object, which is family Array object, because Array is an Object
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

// Object.assign({}, jessica2); copied that property, that was not changed as I changed the lastName in the copy
// However family object is a deeply nested object, therefore Object.assign not copied it to the new object
console.log('Before marriage: ', jessica2); // now it has 4 members in Family Array on both of them
console.log('After marriage:', jessicaCopy); // now it has 4 members in Family Array on both of them

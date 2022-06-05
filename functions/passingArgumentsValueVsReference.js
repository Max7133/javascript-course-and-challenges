'use strict';

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  // Number of the flight was changed, and name
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name; // I manipulate the 'passenger' Object, which is the same as manipulating the 'jonas' object

  // Before checking in, it will check the passport number
  if (passenger.passport === 24739479284) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

// Output result is this because, flight is a Primitive Type, it's just a String
// as I passed that value into the function down here, then the flightNum parameter up there, is basically a copy of that original value
// so flightNum contains a copy, and not the original value of the 'flight' variable
//checkIn(flight, jonas);
//console.log(flight);
//console.log(jonas);

// It is going to be the same a writing
//const flightNum = flight; // this will just copy this value to flightNum
//const passenger = jonas; // When I try to copy an object like this, I only copying the reference to that Object in the Memory Heap
// but they both point to the same object in memory

//S U M M A R Y, passing a Primitive Type to a Function is the same as just creating a copy
//..example: const flightNum = flight; like this, outside of the Function
//so the value is simply copied.

//On the other hand, when I pass an Object to a Function, it is really just like copying an Object like this: 'const passenger = jonas;'
//Whatever I change in the COPY OF THE OBJECT will CHANGE in the ORIGINAL OBJECT

// OBJECTS behave This Way when passed to Functions, can have unforeseeable consequences in large code bases.
// Example:

// it will except any person
const newPassport = function (person) {
  // it will change persons passport number
  person.passport = Math.trunc(Math.random() * 10000000000);
};

//I changed my passport before I checked in
newPassport(jonas);
checkIn(flight, jonas);

//JavaScript DOES NOT HAVE PASSING BY REFERENCE, ONLY PASSING BY VALUE, EVEN THOUGH IT LOOKS LIKE IT'S PASSING BY REFERENCE.
//Example: In C++ where you can pass a Reference to any Value instead of the Value itself.
//This WORKS even with Primitives, so I could pass a Reference to the Value 5, and then the Original Value outside of the Function, WOULD BE CHANGED!
//And this is called PASS BY REFERENCE.

//JavaScript DOES NOT HAVE PASS BY REFERENCE.
//For Object, we do in fact Pass in a Reference(the memory address of the Object)
//However, that Reference itself is still a VALUE that contains a memory address. So basically we pass a Reference to the Function, but we do Not Pass by Reference.

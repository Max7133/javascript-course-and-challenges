'use strict';

//////////////////////// T H E   C A L L   A N D   A P P L Y   M E T H O D S ///////////////////////////////////////

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  // The 'this' keyword here points to the 'lufthansa' object itself, because thats the Object on which the book Method here was called.
  // Enhanced Object Literal Syntax below
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    // Adding a new object to the bookings Array
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Max P.');
lufthansa.book(635, 'Albina P');
console.log(lufthansa); // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(2), book: ƒ}

///

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
// Copying and pasting the 'book' Method here from 'lufthansa' is a bad practise
// Instead, I'm going to take the 'book' Method and store it in an External Function
// And then I can reuse that Function for all different airlines.
const book = lufthansa.book;

// Does NOT work!
//book(23, 'Vitautas Inventi'); // If I call like this I will have:   Cannot read properties of undefined (reading 'airline')
// This Error occured because this 'book' function here, is now just a separate regular Function call, a copy of lufthansa.book, but it is not a Method anymore.
// Therefore the 'THIS' keyword inside of 'lufthansa' Object will point to Undefined
// It is no longer the Method 'book' that I called in 'lufthansa' Object.
// In a regular Function call, the 'THIS' keyword points to Undefined
// The 'THIS' keyword depends on how the Function is actually called.

// To FIX this problem, I need to tell JavaScript explicitly, what the 'THIS' Keyword in 'lufthansa' Object should be like.
// If I want to book a Lufthansa flight, the THIS Keyword should point to Lufthansa (SAME WITH Eurowings)
// The FIX is 3 Function Methods (Call(), Apply(), Bind())
// A Function is really just an Object, and Objects have Methods, therefore Functions can have Methods to, and the Call Method is one of them.
// C A L L  M E T H O D
book.call(eurowings, 23, 'Vitautas Inventi'); // This time I did not call the 'book' Function myself, instead, I called the call METHOD
// And then this 'call()' Method which will call the 'book' Function with the THIS Keyword set to 'eurowings' Object, or whatever I pass in the first Argument of the call() Method
// This allows me to manually and explicitly set the THIS Keyword of ANY Function I want to call.
// Then all the arguments after the first one (23, 'Vitautas Inventi') are simply the Arguments of the original Function.
book.call(lufthansa, 239, 'Thomas P');

console.log(eurowings); // {name: 'Eurowings', iataCode: 'EW', bookings: Array(1)}
console.log(lufthansa); // {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(3), book: ƒ}

///

// Like in 'lufthansa', 'eurowings' Objects, these property names needs to be the same, because the book() Method is trying to read just these properties.
// So it's allways (airline, iataCode, bookings)
const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Max P');

// A P P L Y  M E T H O D (IS NOT USED MUCH IN MODERN JavaScript)
// The Apply Method is the same as the Call Method, the only difference is that Apply Method dosen't receive a list of Arguments, after the THIS Keyword (583, 'Max P')
// Instead, the Apply Method is going to take of the Arguments, it will then take the Elements from that Array and pass it into the Function.
const flightData = [583, 'George Cooper'];
// The first Argument is the THIS Keyword (swiss)
// The second Argument is the Array of data (flightData)
book.apply(swiss, flightData);
console.log(swiss); // {airline: 'Swiss Air Lines', iataCode: 'LX', bookings: Array(2)}

// A BETTER way of doing the EXACT same thing.
// Instead of using the Apply Method, I can still use the Call Method
book.call(swiss, ...flightData); // Is written the SAME as book.apply(swiss, flightData); So the output is the same.

// B I N D  M E T H O D
// Just like the Call Method, Bind Method also allows to manually set the THIS Keyword for ANY Function call
// The difference is that B I N D does not immediately call the Function, instead it returns a NEW Function, where the THIS Keyword is bound.
// So it is set to whatever Value I pass in to the Bind Method

// I need to use the 'book' Function for 'eurowings' all the time.
// book.call(eurowings, 23, 'Sarah Williams');
// I'm using the Bind Method to create a new Function with the THIS Keyword also set to 'eurowings'
// This will not call the 'book' Function, instead it will return a new Function, where the THIS Keyword will always be set to 'eurowings'
const bookEW = book.bind(eurowings);
// Creating 1 booking Function for each of the airlines
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
// This Function bellow already has the THIS Keyword set in stone, so here I don't need to specify the THIS Keyword again
bookEW(23, 'Stewen Williams'); // Stewen Williams booked a seat on Eurowings flight EW23

// In the Call Method, I can pass multiple Arguments and the THIS Keyword 'eurowings'
// In the Bind Method, I can do the same, and then all of these Arguments will also be basically set in stone, they will be defined and the Function will then always be called, with these same Arguments.
// For Example, I could use Bind to create a Function, for one specific airline and a specific flight number
const bookEW23 = book.bind(eurowings, 23); // comparing with book(flightNum, name), it is now as if the flightNum has been already set.
bookEW23('Dr Dr'); // now I just used the name
bookEW23('Some Guy');

// Specifying parts of the Argument beforehand, is a common pattern called Partial Applicaton
// Partial Applicaton means that a part of the arguments, of the original function are already applied (already set) like in bookEW23 with 23

// Bind Method Example when using Objects together with EventListeners
// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this); // <button class="buy">Buy new plane</button>
  this.planes++; // whenever I click on the button, I want to add a new plane
  console.log(this.planes); // NAN, Reason is that the THIS Keyword will point to the Button Element, thats why this console.log(this); // <button class="buy">Buy new plane</button>
};
// lufthansa.buyPlane(); Would Have Worked, because then the THIS Keyword would be this 'lufthansa', because that't the Object calling the Function
// but in the example below it is the EventListener who is calling that Function

// the 'Buy new plane' button has the class 'buy'
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); // I need to manually define the THIS Keyword here, for it to work
// FIX
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // I need to manually define the THIS Keyword here, for it to work

// Example with Partial Application for the Bind Method
// Partial Application (preseting the Parameters)
// A Function that adds a tax to some Value

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
// There is a Tax that I use all the time
// I can now use the Bind Function on addTax Function and preset the rate always, so it will always be 23%
// And then I only have this addVAT Function that only calculates the VAT, for any Value I pass into it.
// First I BIND the THIS Keyword, but since I don't have it, I write 'null'
const addVAT = addTax.bind(null, 0.23); // is the same as addVAT = value => value + value * 0.23;
console.log(addVAT(100)); // 123
console.log(addVAT(23)); // 28.29

// Same Example with Function calling another Function (CHALLENGE)
// This Function below only receives the 'rate' 23% same as upper const addVAT = addTax.bind(null, 0.23);
// My Example
// I created addTaxRate Function that returns -> return function (value) {console.log(`${value + value * rate}`)};
// The 1st Function needs a rate, because the rate is also what I used to define in addVAT '0.23'
// So then the resulting Function is then the one that takes the Value
const addTaxRate = function (rate) {
  return function (value) {
    console.log(`${value + value * rate}`);
  };
};

const calculateVat = addTaxRate(0.23);
calculateVat(100); // 123
calculateVat(23); // 28.29

// Teachers Example
const addTaxRateTeacher = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const calculateVatTeacher = addTaxRateTeacher(0.23);
console.log(calculateVatTeacher(100)); // 123
console.log(calculateVatTeacher(23)); // 28.29

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

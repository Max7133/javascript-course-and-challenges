'use strict';

/////// D E F A U L T   P A R A M E T E R S

// Empty booking Array
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES6 Way LOOK UP, is declared in the Function Parameter for ex. numPassengers = 1
  // I can do any expressions there for ex price = 199 * 2
  // Also I can use values of other parameters that were set before it price = 199 * numPassengers

  // ES5 Way
  /* 
  // Default numPassangers value is 1
  // numPassengers was Falsy Value (because it was Undefined), then the result of
  // the OR operator will be 1
  numPassengers = numPassengers || 1;
  // setting Default value for Price
  price = price || 199; */

  // Creating an Object for pushing data to the empty bookings Array
  const booking = {
    // Enhanced object literal syntax (oldway flightNum: flightNum)
    // I simply define a Variable here and that will then create a Property
    // with this Name and also the value that's in the Variable
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123'); // {flightNum: 'LH123', numPassengers: 1, price: 199}
createBooking('LH123', 2, 800); // {flightNum: 'LH123', numPassengers: 2, price: 800}
createBooking('LH123', 2); // {flightNum: 'LH123', numPassengers: 2, price: 398}
createBooking('LH123', 5); // {flightNum: 'LH123', numPassengers: 5, price: 995}

// I cannot skip the parameters, I can only leave it as a Default with using 'undefiend' === same thing when not even setting it
createBooking('LH123', undefined, 1000); // {flightNum: 'LH123', numPassengers: 1, price: 1000}

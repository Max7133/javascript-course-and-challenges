'use strict';

///////////////////////////////////////   B U I L D I N G   A   S I M P L E   P R O M I S E   ///////////////////////////////////////

////// I will encapsulate Asynchronouse behaviour into a Promise.

//// A fulfilled Promise mean to win the lottery, a rejected Promise means to lose.
// Creating a new Promise using the Promise Constructor. (Promises are essentially just a special kind of Object in JavaScript)
// The Promise Constructor, takes exactly 1 Argument (Executor Function)
// As soon as the Promise Constructor runs, it will automatically execute this Executor Function that I pass in
// and as it executes this Function here, it will do so by passing in 2 other Arguments (Resolve & Reject Functions)
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening...');
  // this Timer will simulate the time Data is passed between buying the lottery ticket and actually getting the Result.
  setTimeout(function () {
    // here we win and lose 50% of the cases Math.random() is a Number between 0 & 1)
    if (Math.random() >= 0.5) {
      // Then I want to call the resolve(), this is the Function that I have passed as 1 of the Arguments in this Executor Function
      // In order to Set the Promise as Fulfilled, I use the resolve()
      // if Win the Lottery means a Fulfilled Promise.
      // into the resolve() I'm passing the Fulfilled Value of the Promise so it can later be Consumed with the then()
      resolve('You WIN the lottery!'); // this Value will be consumed in the then()
    } else {
      // in the reject() I'm passing in the Error Message that I later want to be able in the Catch Handler/Method
      reject(new Error('You lost your money')); // this Error will be in the catch()
    }
  }, 2000);
}); // this is like the 'fetch' Function, which also creates a Promise

//// Consuming the Promise
// lotteryPromise is going to be a Promise Object at this point, and so I can call the then()
// the then() needs a Callback Function that is going to be Called with the Resolved Value of the Promise
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

////// Promosifying means to convert Callback based Asynchronous behavior to Promise based.
// Promisifying the setTimeout() and creating a 'wait' Function
// Inside this Function I'm creating and returning the Promise
const wait = function (seconds) {
  // Executor Function, this time only with Resolve Function without Reject Function (because it is Impossible for the Timer to Fail)
  return new Promise(function (resolve) {
    // in case of a Timer it's not really necessary tp wait for some Value
    // in this case all I want to do is to make the Code wait, and so no Resolved Value needed
    setTimeout(resolve, seconds * 1000); // I want to run this Timer for a certain amount of seconds
  });
};

//// Consuming the Promise
// This will now create a Promise that will wait for 2 seconds
// In the Callback Function I dont receive Any Resolved Value, so I leave it empty
wait(2)
  .then(() => {
    // Here in this Callback I could now run Any Code that I wanted to be executed after 2 seconds
    console.log('I waited for 2 seconds');
    // Waiting 1 more second, and Returning a New Promise here
    return wait(1); // Same thing when chaining 2 sequential AJAX Calls using the 'fetch' Function
    // In the Result of the 1st fetch, I would create a new fetch and Return it.

    // Then therefore all of this Returns a New Promise and then I can one more time handle that.
  })
  .then(() => console.log('I waited for 1 second'));

//// There is a way to very easily create a Fulfilled or a Rejected Promise immediately.
// This is a Static Method on a Promise Constructor, inside I pass in the Resolved Value
Promise.resolve('abc').then(x => console.log(x));

// then() is no necessary because there will be No Resolved Value, so I can just 'catch' it like this
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

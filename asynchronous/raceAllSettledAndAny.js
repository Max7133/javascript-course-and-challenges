'use strict';

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`); // Something went wrong !!! Country not found (400). Try again!
    return response.json();
  });
};

///////////////////////////////////////   O T H E R   P R O M I S E   C O M B I N A T O R S :   R A C E ,   A L L S E T T L E D   A N D   A N Y    ///////////////////////////////////////

//// Promise.race
//// Promise.race just like all other Combinators, receives an Array of Promises and also returns a Promise
//// Now this Promise returned by Promise.race is Settled as soon as one of the input Promises Settles.
//// Settled - means that a Value is available, but it doesn't matter if the Promise got Rejected or Fulfilled,
//// and so in Promise.race, the 1st Settled Promise wins the race.

// Creating an IIFE
// IIFE so that I can use Async Await without creating a whole new Function with a Name
(async function () {
  // Defining Array of Promises
  const res = await Promise.race([
    await getJSON(`https://restcountries.com/v2/name/egypt`),
    await getJSON(`https://restcountries.com/v2/name/italy`),
    await getJSON(`https://restcountries.com/v2/name/mexico`),
  ]); // now these Promises will 'race' against each other
  console.log(res[0]); // here I get only 1 Result, and NOT the Results of 3
})(); // If the winning Promise is then a Fulfilled Promise, then the Fulfillment Value of this whole Race Promise is gonna be the Fulfillment Value of the Winning Promise.
// The Promise that gets Rejected can also win the Race (Promise.race short circuits whenever one of the Promises gets Settled)

// If the user has a very bad Internet Connection, then a Fetch request in some application might take way too long to actually be useful.
// For this there is a special Time Out Promise which automatically Rejects after a certain time has passed.
// This one is similar to the wait(), the difference is that this one is going to Reject and NOT going to Resolve.
const timeout = function (sec) {
  // Executor Function
  // _ throw away Variable instead of Resolve
  return new Promise(function (_, reject) {
    setTimeout(function () {
      // After a certain amount of seconds, it will Reject the Promise
      reject(new Error('Request took too long!'));
    }, sec * 1000); // 1000 milliseconds
  });
};
// Now I can have an AJAX Call race against Timeout Function
Promise.race([
  getJSON(`https://restcountries.com/v2/name/finland`),
  timeout(1), // 2nd Promise, and only wait 1 second
]) // These 2 Promises will race agains each other, if Timeout wins, then then all of this here will be Rejected, that will then Abort the Fetch that is happening here in getJSON.
  .then(res => console.log(res[0]))
  .catch(err => console.error(err)); // Error: Request took too long!

//// Promise.allSettled (ES2020)
//// It takes in an Array of Promises again, and it will simply return an Array of all the Settled Promises. (no matter if the Promise got Rejected or Fulfilled)
//// It's similar to Promise.all in regard that it also returns an Array of all the Results
//// but the difference is that Promise.all will Short Circuit as soon as 1 Promise Rejects
//// but Promise.allSettled, simply NEVER Short Circuits, so it will simply return all the Results of all the Promises.

// Promise.allSettled
Promise.allSettled([
  // Very basic example, that will fake Promises
  Promise.resolve('Success'), // This automatically creates a Promise that is Resolved (so I don't have to wait for Anything to finish) like in getJSON
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res)); // 0: {status: 'fulfilled', value: 'Success'} 1: {status: 'rejected', reason: 'ERROR'} 2: {status: 'fulfilled', value: 'Another success'}

// Promise.all
Promise.all([
  // Very basic example, that will fake Promises
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err)); // ERROR (Because Promise.all Combinator will Short Circuit if there is 1 ERROR, if there is 1 Rejected Promise.)

//// Promise.any (ES2021)
//// Promise.any takes in an Array of Multiple Promises and this one will then return the 1st Fulfilled Promise, and it will ignore Rejected Promises.
//// Promise.any is very similar to Promise.race with the Difference that Rejected Promises ARE IGNORED.
//// And so therefore the Results of Promise.any is ALWAYS gonna be a Fulfilled Promise, unlesss of couse All of them Reject.

Promise.any([
  // Very basic example, that will fake Promises
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res)) // Success
  .catch(err => console.error(err));

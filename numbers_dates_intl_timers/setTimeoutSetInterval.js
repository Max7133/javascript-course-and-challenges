'use strict';

/////////////////////////////////////////////   S E T   T I M E O U T   A N D   S E T   I N T E R V A L   /////////////////////////////////////////////

// setTimeout
// This Callback Function here is the 1st Argument of the setTimeout Function
// 2nd Argument - the amount of Milliseconds that will pass until this Function is called.
setTimeout(() => console.log('Here is your pizza!'), 3000); // Here is your pizza! (after 3 seconds)
// The Code execution DOES NOT STOP at this point
// Proof
console.log('Waiting...'); // Waiting... (after the 3 seconds Here is your pizza! will appear),
// As soon as JavaScript hits this line of Code setTimeout(() => console.log('Here is your pizza!'), 3000),
// it will simply keep counting the time in the background, and register this Callback Function to be called after that time has elapsed,
// and then immediately, JavaScript will move on to the next line console.log('Waiting...'),
// and this mechanism is called Asynchronous JavaScript.

const ingredients = ['olives', 'spinach'];

// Passing some Arguments into this Function
// All of the Arguments that I passed here after the delay, will be Arguments to the Function
// Those Arguments are ing1, ing2
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  //   'olives',
  //   'spinach'
  ...ingredients
); // Here is your pizza with olives and spinach (after 3 seconds)

// Before these 3 seconds here have passed, I can cancel the Timeout.
// I stored the Result of the setTimeout Function in 'pizzaTimer' Variable
// Then I can use the 'pizzaTimer' Variable to Clear the Timeout, and then I can use this Variable to Delete the Timer with 'clearTimeout()'
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer); // Since the 'ingredients' Array includes 'spinach', the String will NOT be printed.

// setInterval for creating a clock that will display in the Console
setInterval(function () {
  const now = new Date();
  const hour = `${now.getHours()}`.padStart(2, 0);
  const min = `${now.getMinutes()}`.padStart(2, 0);
  const seconds = `${now.getSeconds()}`.padStart(2, 0);
  console.log(`${hour}:${min}:${seconds}`); // 13:37:03
}, 1000); // I want to execute this every 1 second
// Every second now a New Date is created here, and is then logged to the Console

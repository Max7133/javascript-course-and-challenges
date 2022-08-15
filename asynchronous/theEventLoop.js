'use strict';

///////////////////////////////////////   T H E   E V E N T   L O O P   I N   P R A C T I S E   ///////////////////////////////////////
// Basic Example
console.log('Test start');

// This is a timer, which should call this timer Function exactly after 0 seconds.
// this means that after 0 seconds this Callback will be put on the Callback Queue
setTimeout(() => console.log('0 sec timer'), 0);

// Building a Promise that resolves immediately. (Promise.resolve allows to create a Promise that is immediately resolved, so one that immediately has a success Value.)
// And that 'fulfilled', success Value, is gonna be this 'Resolved promise 1'
// and the I can handle this Resolved Promise, and so that, the 'res' I can log it to the Console
// Just like in Any other Promise, we handle it with 'then()', and this Callback Function here, will get called with the Resolved Value ('Resolved promise 1'), as an Argument.
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  // Before loging the Result to the Console, I want this Callback Function to have a Really Heavy Task, which should take a lot of time.
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end');

////// HOW I THINK IT WILL WORK (I WAS RIGHT :D)
//// Code outside of Any Callback, will run first!
// 1. Test start
// 2. Test end
//// Both the 'timer' and the Promise will finish at the Exact Same Time (both after 0 sec)
//// but, the Callback of the Resolved Promise here, will be put to the Micro-Task Queue, and this Micro-Task Que has Priority over the Callback queue.
// 3. Resolved promise 1
// 4. 0 sec timer

////// ALL CODE EXECUTED IN ORDER AT THE END OF THE LECTURE
// 1. Test start
// 2. Test end
// 3. Resolved promise 1
// 4. Resolved promise 2
//// Now only after all that long work in the for Loop, the 0 second 'timer' message appeared on the screen.
//// This is actual proof that these 0 sec that I have here are Not a guarantee,
//// this means, that I cannot really do high precision things using JS timers, whenever I'm working with Promises (micro-tasks), and with 'timers' at the same time.
// 5. 0 sec timer

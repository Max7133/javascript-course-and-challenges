import add from './shoppingCart.js';

/////////////////////////////////////////   T O P   L E V E L   A W A I T   /////////////////////////////////////////
//// Starting from ES2022, we can now use the Await Keyword outside of Async Functions (in Modules) - which we call Top-Level Await

//// Using Top-Level Await (BLOCKING THE EXECUTION EXAMPLE)
//console.log('Start fetching');
// I will Await the Result here and then save it into a Variable
//const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// Then I need another Await to Parse the Data as JSON
//const data = await res.json();
//console.log(data); // Array of 100 posts, where each of them is an Object

//// IMPORTANT: All this is great and very useful, this actually BLOCKS the Execution of the ENTIRE MODULE NOW.
// Demonstration
//console.log('Something');
// Result: It Start fetching, and it's doing the work and only after that, it is really logging this something here to the Console.
// So in fact the 1st Await Keyword here, which is now outside of an Async Function, is BLOCKING THE ENTIRE EXECUTION OF THIS MODULE
// This really wasn't possible before we got Top-Level await in JavaScript.

//// Using Top-Level Await (Real World Example)
// There are situations where we do have an Async Function that we want to Return some Data.
// This Function will do this Fetch Request here, and will then only Return the very last post.
const getLastPost = async function () {
  // I will Await the Result here and then save it into a Variable
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  // Then I need another Await to Parse the Data as JSON
  const data = await res.json();
  console.log(data);

  // Returning an Object which contains the 'title' and the 'body'
  return { title: data.at(-1).title, text: data.at(-1).body }; // Returning a New Object with the 'title' of 'data' which is this Entire Array,
}; // and the At Method to get the very last Element of an Array, the other one is called the 'body', but I just call it 'text'

// Saving that Returned Value into a Variable called lastPost.
const lastPost = getLastPost(); // Will return the Promise, and not the actual Data itself, by the time it's running this line of Code here, the data has Not Yet Arrived.

//// NOT VERY CLEAN
// For getting the Object instead of a Promise I need to use Regular Promises.
// I'm taking this Promise here (that is Returned and Stored in this Variable), and on that I call the then(), in the then() I get access to the Resolved Value, which I will call 'last'
lastPost.then(last => console.log(last)); // {title: 'at nam consequatur ea labore ea harum', text: 'cupiditate quo est a modi nesciunt soluta\nipsa vol…nam et distinctio eum\naccusamus ratione error aut'}

//// CLEAN (WITH TOP-LEVEL AWAIT)
// Calling lastPost2 which will be the Result of Awaiting getLastPost
const lastPost2 = await getLastPost();
console.log(lastPost2);

//// One more Important Implication of using Top-Level Await.
// That is the fact if 1 Module Imports which has a Top-Level Await, then the Importing Module will wait for the Imported Module to finish the blocking code.
// Top-Level Await is blocking the Execution, no only in this Module, but also in the Module that is Importing it.
// Using Top-Level Await, so Await outside of any Async Function will block the Entire Module in a way that we really couldn't block code execution before.
// This is not only a really helpful tool but also one that we neeed to use with caution

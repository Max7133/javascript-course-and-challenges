'Use Strict';

///////////////////////// F U N C T I O N S   R E T U R N I N G   F U N C T I O N S ///////////////////////////////////////////////////

// This Function will return a new Function
const greet = function (greeting) {
  // This Function will receive a greeting and the name of the person that I passed into this Function.
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
// Calling the 'greet' Function
// Storing the result of this Function call, which will be that Function
// greeterHey value is now a Function (upper function(name))
const greeterHey = greet('Hey');
// Now I can call this greeter function just as if it was any other Function that I defined myself
greeterHey('Tomas');
greeterHey('Max');

// In the concole.log 'upper' it will return:
// Hey Tomas
// Hey Max

// I can do this all in one go
greet('Hello')('Max'); // This is now a Function, if this is a Function, I can immediately call it.
// I pass in the NAME ('Max'), which is the Argument of the Function(greet)
// concole.log result : Hello Max

// Write the same with Arrow Function CHALLENGE

const greetArr =
  greeting =>
  // This Function will receive a greeting and the name of the person that I passed into this Function.
  name =>
    console.log(`${greeting} ${name}`);
greetArr('Yo')('Bro!');

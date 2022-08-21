/////////////////////////////////////////   T H E   M O D U L E   P A T T E R N   /////////////////////////////////////////
//// The Module Pattern was used before (before ES6 Modules came) in order to Implement Modules in JavaScript
//// The main goal of the Module Pattern is to Encapsulate functionality, to have Private Data, and to expose a Public API
//// The best way of achieving all that is by simply using a Function,
//// because Functions gives us Private Data by default and allow us to Return Values, which can become our Public API

// How Module Pattern is implemented.
// Writing a IIFE Function, the reason for that is because this way we don't have to call it separately, andwe can also ensure that it's only called once
// The only purpose for this Function is to create a New Scope and Return Data just once

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    // Pushing a New Object to the cart Array,
    cart.push({ product, quantity });
    // Here I will also log, something that is Private to this Module, something that will NOT be in this Exporterd Object, and that is 'shippingCost'
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    ); // In order to produce this String here, the Function will also have to use 'shippingCost' Variable, that was only present at its birthplace, whic no longer does exist besides that.
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  }; // All of this Data is Private because it is inside of the Scope of the Function
  // All I need to do now is to Return some of this stuff in order to basically Return a Public API
  // To do that, I simply return an Object which contains the 'stuff' that I want to make Public here

  // However, right now I'm not storing this returned Object here anywhere
  // If I run this right now, then this Return Object, kind of Disappears into nothing.
  // FIX: by assigning the Result of running this IIFE here to a New Variable 'ShoppingCart2'
  return {
    // Adding 'addToCart' Function to the Public API
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4); // 4 apple added to cart (shipping cost is 10)
ShoppingCart2.addToCart('pizza', 2); // 2 pizza added to cart (shipping cost is 10)
console.log(ShoppingCart2);

// The Properties that I wanted to make Private, are NOT accessible
console.log(ShoppingCart2.shippingCost); // undefined

// IIFE can be only executed once, so this Function has already Returned long ago
// so this Function was only executed once in the beginning, and all it did was to Return the Object and assigned it to ShopingCart2 Variable
// but then I called it several times, and manipulated the Data that is inside of the IIFE Function
// The answer how all of this works like this is CLOSURES
// Closures allow a Function to have access to all the Variable that were present at its Birthplace basically

//// This is how the Module Patter works, it has been working for a long time for Developers, so long before ES6 Modules even existed in JavaScript.
//// The Problem is that if we wanted 1 Module per file, like we have with ES6 Modules, then we would have to create Different Scripts and link ALL OF THEM in the HTML file.
//// And that then creates a couple of Problems, like we have to be careful with the order in which we declate them in HTML, and we would have all of the Variables living in the Global Scope
//// And finally, we also couldn't Bundle them together using a Module Bundler (using a Module Bundler is very important in Modern JavaScript)
//// So the Module Pattern does indeed work quite good, but it has some limitations, that's the reason why Native Modules were added to the language in ES6.

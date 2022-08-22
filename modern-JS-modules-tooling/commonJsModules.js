/////////////////////////////////////////   C O M M O N   J S   M O D U L E S   /////////////////////////////////////////
//// Besides native ES Modules and the Module Pattern, there are also Other Module systems, that have been used by JS in the past.
//// They were NOT Native JavaScript, they relied on some External Implementations
//// And two Examples are: AMD Modules, and CommonJS Modules

//// CommonJS Modules are important for us, beause they have been used in Node.js, for almost all of its existence.
//// Only very recently, ES Modules have actually been implemented, in Node.js
//// And Node.js is a way of running JS on a Web Server, outside of a Browser.
//// The Big Consequence of this, is that almost All the Modules, in the NPM Repository, that we can use in our own Code, STILL use the CommonJS Module system
//// The Reason for that is that NPM was originally only intended for Node, whih uses commonJS, only later NPM became the standard Repository, for the whole JS world.
//// And so now we are basically stuck, with CommonJS. Therefore, we can still see a lot of CommonJS still around.

//// EXPORT
// Exporting something from this Module
// Just like ES6 Modules, in CommonJS, 1 File is 1 Module
// and we Export something from a Module using, export. and then the Name of the Export addToCart, and then whatever we want to Export there.
// THIS IS NOT GOING TO WORK IN THE BROWSER, BUT IT WILL WORK IN NODE.JS
// This export. Keyword here is an Object that, is of course not Defined here in the Code and also not in the Browser
// But in Node.js it is an Important Object, that is used.
export.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  //// IMPORT
  // Now then to Import something, would be pretty similiar to ES Modules
  // but then from here, we will call a Require Function
  // require() of course not Defined, nere in the Browser environment, but it is defined in Node.js, because this is part of the CommonJS specification.
  const { addToCart } = require('./shoppingCart.js')
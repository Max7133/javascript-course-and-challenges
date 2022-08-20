//// Importing a Module
// Importing a Module, without any Value
// In module names, it's also convention to use camelCase names.
// When connecting a Module to the HTML file, I need to specify the Type Attribute
// All Modules are executed in Strict Mode by default
// the Code in this Module is Parsed and before it is executed, all the code in the Modules that it imports is executed first

////// NAMED IMPORTS
// With Named Imports, I have to give them the Same Name and inside Curly Braces {}
// import {
//   addToCart,
//   totalPrice as price,
//   tq,
// } from './shoppingCart.js';

// Now I can call the 'addToCart' Function, as if it was Defined here in the Same Scope
// addToCart('bread', 5);

// Now I can use the Variables that I Exported from 'shoppingCart.js' and Imported them here in 'script.js'
// console.log(price, tq); // 237 23

console.log('Importing module'); // will run second

// Importing ALL the Exports of a Module at the Same Time
// * = EVERYTHING and the Name something like PascalCase or a Class Name, that's kind of the Convention when Importing Everything into an Object like this.
// This will then create a namespace for ALL of the Values, Exported from that Module
//import * as ShoppingCart from './shoppingCart.js'; // This will create an Object containing everything that is Exported from the Module that I specify here

// Whenever I want to use something that was Exported like this 'addToCart' Function, then I have to take that from this Object
//ShoppingCart.addToCart('bread', 5); // 5 bread added to cart

// shoppingCart.js Module here is now basivally Exporting a Public API, just like a Class
// It's as if this Object here was an Object created from a Class which now has these Methods
// and these Properties
//console.log(ShoppingCart.totalPrice); // 237 // That's the other Named Export from this Module.

// This will then Import the Default Export, NO MATTER WHAT THAT'S CALLED (I CALLED IT ADD). (this was the Whole Function VALUE)
// IMPORTING THE SAME MODULE HERE TWICE IS NOT ADVISABLE (BUT NO ERROR, STILL I COMMENTED OUT THE TOP IMPORT)
//import add from './shoppingCart.js';

// Mixing them All in the Same Import Statement, if I wanted I could have the Default and Named Imports and Exports All at the Same Time.
// IN PRACTICE, USUALLY NEVER MIX NAMED AND DEFAULT EXPORTS IN THE SAME MODULE.
//import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
//console.log(price); // 237

// The Prefered Style is actually to just use 1 Default Export per Module, and then Import that here like I did.
// That's the reason why it is easier to Import a Default Exports, so the here I don't even need to use the Curly Braces {}
import add, { cart } from './shoppingCart.js'; // I'm mixing again Default & Named Export just to prove a point that IMPORTS ARE IN FACT, A LIFE CONNECTION TO EXPORTS
add('pizza', 2); // 2 pizza added to cart

// IMPORTS ARE IN FACT, A LIFE CONNECTION TO EXPORTS
// I EXPORTED AN EMPTY CART ARRAY FROM shoppingCart.js
add('bread', 5); // 5 bread added to cart
add('apples', 4); // 4 apples added to cart
// IMPORTING THAT EMPTY CART ARRAY HERE TO script.js

// SO HERE I DO NOT SEE THAT EMPTY OBJECT, THAT I EXPORTED, BUT INSTEAD I HAVE THIS ARRAY WITH THE OBJECT THAT I JUST ADD TO THE CART BY CALLING THE ADD FUNCTION HERE
console.log(cart); // [{…}, {…}, {…}]
// 0: {product: 'pizza', quantity: 2}
// 1: {product: 'bread', quantity: 5}
// 2: {product: 'apples', quantity: 4}

// THAT PROVES THAT THIS IMPORT HERE { cart }, NOT SIMPLY A COPY OF THE VALUE, THAT I EXPORTED FROM shoppingCart.js
// IF IT WAS A COPY, THEN HERE I WOULD SIMPLY GET THAT EMPTY ARRAY, THAT'S HOW THE cart VARIABLE LOOKED LIKE BY THE TIME I EXPORTED IT.
// AS I CALLED THE FUNCTION THAT I EXPORTED FROM shoppingCart.js THAT I CALLED add, IT KEEPS PUSHING OBJECTS TO THAT cart ARRAY
// IMPORTS ARE NOT COPIES OF THE EXPORT!!! THEY ARE INSTEAD LIKE A LIVE CONNECTION, THAT MEANS THAT THEY POINT TO THE SAME PLACE IN MEMORY

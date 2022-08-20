//// Exporting a Module

console.log('Exporting module'); // will run first
// this means that, this code is executed before any code inn the Importing Module

// Variables that are Declared inside of a Module, are actually sculpt to This Module (Inside a Module, the Module itself is like the Top Level Scope)
// and so by Default, this means that all Top Level Variables are Private inside of this Module (unlike Traditional Scripts, which would put all these Variables here in the Global Scope)
const shippingCost = 10;
export const cart = [];
// If I wanted to use these Variables in script.js Module, then I need to use Exports

// And in ES Modules, there are 2 Types of Exports, Named Exports and Default Exports
// Named Exports is the simplest way of Exporting something from a Module, because all I need to do is to put Export in front of anything, that I might want to Export.

//// NAMED EXPORTS
// by now 'addToCart' Variable is Private inside of this Module
// If I wanted to now Export it, so that I can Import it in some other Module, all I need to write is 'export' (now I can Import this Variable in 'script.js')
export const addToCart = function (product, quantity) {
  // This then creates a Named Export from this Module.
  // Pushing a New Object to the cart Array,
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

//// NAMED EXPORTS
// Exporting Multiple things from a Module using Named Exports (this is the Main use case of Named Exports)
const totalPrice = 237;
const totalQuantity = 23;
// Now I can Export all of this at the Same Time again, using Named Exports

export { totalPrice, totalQuantity as tq };

//// DEFAULT EXPORTS
// Default Exports are used when we only want to Export 1 Thing per Module
// export default and then here, we want to simply Export a Value
// For e.g., if I wanted to Export the SAME Function, I would simply Export the Value itself, NOT THE VARIABLE!
// No Name for the Function is involved at all, just Exporting the Value (when I Import it, I can give it Any Name)
export default function (product, quantity) {
  // This then creates a Named Export from this Module.
  // Pushing a New Object to the cart Array,
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

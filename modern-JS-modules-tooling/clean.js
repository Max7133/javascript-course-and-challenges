'use strict';

// Making this also Immutable, because in the end, an Array is also just an Object
// Object.freeze() only freezes the 1st level of the Object (We can still change Objects inside of the Object)
// e.g. budget[0].value = 10000; will change the value of the 1st Entry to 10000 (adding an budget[9] will not work, because adding a completely New Element is not possible)
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// Making a Data Structure (like Arrays, or Objects) Immutable.
// Object.freeze() makes an Object immutable (in that Function, I pass in the Object that I want to make Immutable)
// Now I can no longer put any new Properties into it.
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
//spendingLimits.jay = 200; // Uncaught TypeError: Cannot add property jay, object is not extensible

// Takes in the 'user'
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Checks if the New Expense is below the limit
// If there is no user, then set the user to Jonas (Default Parameter)
//// PURE FUNCTION
const addExpense = function (
  state, // the 'budget' Object
  limits, // the 'spendingLimits' Object
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  // Checks if there is actually a Property with the name of 'user' in 'spendingLimits'
  // The Limit will be set to that Value, if it exists then return it
  // otherwise return 0
  //const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  // SAME BUT BETTER (with Optional Chaining)
  // Checks is there is a 'user' Property, if there is a Property with this name, then spendingLimits?.[user] will be That Value,
  // if not, then it will be Undefined, in that case it will set it to 0
  //const limit = spendingLimits?.[user] ?? 0;
  //const limit = getLimit(user);

  // If the value is less than the limit, then the Expense will Not be added, therefore I set the 'Limit' to 0 upper if the name does not exist
  // In case that the Value is indeed below the limit, then the New Object is created, and the will be pushed to the 'budget' Array
  return value <= getLimit(limits, cleanUser)
    ? //budget.push({ value: -value, description: description, user: user });
      // With Enhanced Object Literal Syntax, I don't need to repeat 'user: user', if the Property name is the same as the Variable name then just 'user' is ok

      // budget.push({ value: -value, description, user: cleanUser });

      // Instead I will return an Array 'budget' but simply with 1 more Object
      [...state, { value: -value, description, user: cleanUser }]
    : state; // this will create a Copy of this 'state' Array, and then adding a New Element after 'state'
};
// Now 'addExpense' because of 'state', will no longer Mutate the 'budget' Object
// Therefore by doing something with the New 'budget' Object, I'm gonna store 'addExpense' into a Variable
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay'); // Jay's limit is 0, his expense will not be added (0 because his name is not in the 'spendingLimits')
console.log(newBudget1); // (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
console.log(newBudget2); // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

// Checks the budget and see if any of the expenses are abobe the limit (in const spendingLimits Object)
// const checkExpenses2 = function (state, limits) {
//   // Instead, I want to keep an array of the same size in the end, in each of these Object I just wamt to add a Property
//   return state.map(entry => {
//     // map() will create a New Object, it will Not Mutate the 'state', instead creates a New 'state' based on the Original one
//     // when the Value is less than the Limit, then I want to copy the Object and add the New Property onto that copy
//     return entry.value < -getLimit(limits, entry.user) // in the map() whatever is Returned from the Callback will be the Element in the same position of the New Array, (that's why I need the 2nd Return here)
//       ? { ...entry, flag: 'limit' }
//       : entry; // otherwise Return Original Entry
//   });
//   // it loops over all of the Entries
//   // for (const entry of newBudget3)
//   //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit'; // when going over the limit, it will flag that by adding a limit String to a new flag Property on the budget entry.
// };

// SAME checkExpenses1 Function converted into an Arrow Function (so I won't need to write Return 2 times)
//// PURE FUNCTION
const checkExpenses = (state, limits) =>
  // Instead, I want to keep an array of the same size in the end, in each of these Object I just wamt to add a Property
  state.map(
    entry =>
      // map() will create a New Object, it will Not Mutate the 'state', instead creates a New 'state' based on the Original one
      // when the Value is less than the Limit, then I want to copy the Object and add the New Property onto that copy
      entry.value < -getLimit(limits, entry.user) // in the map() whatever is Returned from the Callback will be the Element in the same position of the New Array, (that's why I need the 2nd Return here)
        ? { ...entry, flag: 'limit' }
        : entry // otherwise Return Original Entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget); // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}] (BECAUSE JAY IS NOT ALLOWED TO ADD ANYTHING)

//// IMPURE FUNCTION (because it creates a Side Effect, by doing console.log(bigExpenses) on line 120, (ALL console.logs() are IMPURE because they do something, they create something in the Console, they create input output)
// Will log all the Big Expenses.
const logBigExpenses = function (state, bigLimit) {
  // Instead, it will Filter the Array for these Big Expenses, and then for each of the results, creates an Emoji String
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2)) // (2) ['📱', '💻']
    .join(' / '); // 📱 / 💻
  // Instead of (map & join)
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');

  console.log(bigExpenses);
  // let output = '';
  // for (const entry of budget) {
  //   // In case the Entry Value is less than the Limit, then add `${entry.description.slice(-2)} / `, otherwise it won't add Anything ''
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : ''; // taking out the Emoji out here of the String, by getting the Last 2 Characters (Emojis Count as 2 Characters)
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

logBigExpenses(finalBudget, 500); // it will print only the Emoji of all the Expenses that were more expensive than 1000

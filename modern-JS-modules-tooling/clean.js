const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

// Takes in the 'user'
const getLimit = user => spendingLimits?.[user] ?? 0;

// Checks if the New Expense is below the limit
// If there is no user, then set the user to Jonas (Default Parameter)
const addExpense = function (value, description, user = 'jonas') {
  user = user.toLowerCase();

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
  if (value <= getLimit(user)) {
    //budget.push({ value: -value, description: description, user: user });
    // With Enhanced Object Literal Syntax, I don't need to repeat 'user: user', if the Property name is the same as the Variable name then just 'user' is ok
    budget.push({ value: -value, description, user });
  }
};
addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay'); // Jay's limit is 0, his expense will not be added (0 because his name is not in the 'spendingLimits')

// Checks the budget and see if any of the expenses are abobe the limit (in const spendingLimits Object)
const checkExpenses = function () {
  // it loops over all of the Entries
  for (const entry of budget)
    if (entry.value < -getLimit(entry.user)) entry.flag = 'limit'; // when going over the limit, it will flag that by adding a limit String to a new flag Property on the budget entry.
};
checkExpenses();

// Will log all the Big Expenses.
const logBigExpenses = function (bigLimit) {
  let output = '';
  for (const entry of budget) {
    // In case the Entry Value is less than the Limit, then add `${entry.description.slice(-2)} / `, otherwise it won't add Anything ''
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : ''; // taking out the Emoji out here of the String, by getting the Last 2 Characters (Emojis Count as 2 Characters)
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

console.log(budget);
logBigExpenses(500); // it will print only the Emoji of all the Expenses that were more expensive than 1000

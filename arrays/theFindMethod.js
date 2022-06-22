'use strict';

//////////////////////////////////////////////////////   T H E   F I N D   M E T H O D   //////////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// We can use the Find Method to retrieve 1 Element of an Array based on a condition
// The Find Method also accepts a Condition and a Callback Function which will then be called as the Method loops over the Array.
// Unlike the Filter Method, the Find Method won't return a new Array, it will only return the First Element in the Array that satisfies this Condition
// It will Return The 1st Element in the Array for which this operation here becomes True
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements); // (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(firstWithdrawal); // -400

// 2 Fundamental Differences between the Filter Method and the Find Method
// 1st, Filter returns ALL the Elements, that match the Condition while the Find Method ONLY Returns the 1st one
// 2nd, MORE IMPORTANT, The Filter Method Returns A NEW ARRAY while Find Method ONLY Returns the Element itself and not an Array

// Working on a Array of Objects
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
console.log(accounts);

// With the Find Method I can find an Object in the Array based on some Property of that Object
// As I loop over 'accounts' (each of the Current Elements is ONE Account)
// And now I want to select 1 of the accounts by the name
////const account = accounts.find(acc => acc.owner === 'Jessica Davis');
////console.log(account); // {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222}
// Using the Find Method we can then search this Array to find an Object that MATCHES A CERTAIN PROPERTY that we already know.
// Filter Method compares 'Jessica Davis' with the 'acc.owner', and whenever this Condition is True, then THAT Object is Returned.

// So usually the GOAL of the Find Method is to just FIND exactly One Element and therefore we usually set up a Condition where only 1 Element can satisfy that condition.
// That's why we used the '===' Operator here.

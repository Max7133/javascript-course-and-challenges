'use strict';

//////////////////////////////////////////////////////   A L L   A R R A Y   M E T H O D S   P R A C T I C E   //////////////////////////////////////////////////////

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

// 1.)

// The Map Method
// Calculating how much has been deposited in total in the bank. (in all the accounts across the bank)
// I need to get all these 'movements' that are in these different Objects, all into 1 Big Array
// I want a New Array, thats why ill use Map Method
// Whenever we want a New Array with the same length as the previous one (original one), we use Map Method
// const bankDepositSum = accounts.map(accnt => accnt.movements)
// console.log(bankDepositSum); // Arrays with movements Values (4) [Array(8), Array(8), Array(8), Array(5)]

// The Flat Method
// Getting all of these Values out of the Arrays and into the Main Arrays
// Whenever we have an Array of Arrays, we use the Flat Method
// const bankDepositSum = accounts.map(accnt => accnt.movements).flat();
// console.log(bankDepositSum); // Arrays with movements Values AFTER FLAT METHOD (29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]

// The flatMap Method
// Simplifying The Map Method and The Flat Method, with 1 flatMap Method
// Doing the same thing, only with 1 Method instead of 2 Methods
// const bankDepositSum = accounts.flatMap(accnt => accnt.movements);

// The Filter Method
// Filtering 'movements' (deposits) for ONLY the Positive Values
// const bankDepositSum = accounts
//.flatMap(accnt => accnt.movements)
//.filter(mov => mov > 0);
// console.log(bankDepositSum); // (17) [200, 450, 3000, 70, 1300, 5000, 3400, 8500, 200, 340, 50, 400, 430, 1000, 700, 50, 90]

// The Reduce Method
// Adding all the 'movements' TOGETHER
const bankDepositSum = accounts
  .flatMap(accnt => accnt.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(bankDepositSum); // 25180

// 2.) Easy Way
// I want to count how many Deposits there have been in the bank with at least 1000 USD
// 1st Ill take all of the 'movements' and put them All into 1 New Array
// const numDeposits1000 = accounts.flatMap(accnt => accnt.movements);
// console.log(numDeposits1000); // (29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]

// The Filter Method
// 2nd filtering 'movements' that are > 1000
// const numDeposits1000 = accounts
//   .flatMap(accnt => accnt.movements)
//   .filter(mov => mov >= 1000);
// console.log(numDeposits1000); // (6) [3000, 1300, 5000, 3400, 8500, 1000]
// Finally showing how many 'movements' that are > 1000 (with .length)
// const numDeposits1000 = accounts
//   .flatMap(accnt => accnt.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000); // 6

// 2.) Advanced Way (with REDUCE METHOD)
const numDeposits1000 = accounts
  .flatMap(accnt => accnt.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0); // 0 Value is just like having any Valye outside of a Loop, where we store a New Value (which can be a Counter that we Only Update on a certain condition)

console.log(numDeposits1000); // 6

// count++ in the Reduce Method would result the Value being 0, and there is why...
let a = 10;
// 'a' is still 10, even though I used this ++ here
// ++ Does Increment the Value, but it still Returns the previous Value.
console.log(a++); // 10

// If I LOG it again
console.log(a); // 11
// The ++ Operator did it's job here, but the thing is that when we use it like this
// it will still Return the OLD VALUE, which here was 10

// the same thing happened HERE
// .reduce((count, cur) => (cur >= 1000 ? count ++ : count), 0)
// WILL BE 0
// I did COUNT++ which then INCREASED the Value from 0 to 1, but the Result of this Expression here is still 0
// 0 was Returned here to the next Iteration, therefore in the end it will always be 0
// Easy Solution using a PREFIXED ++ OPERATOR, ++count
console.log(++a); // 12

// 3.) EVEN MORE ADVANCED CASE OF REDUCE METHOD
// Creating a New Object (based on the Reduce Method) instead of just a Number or just a String

// Reduce Method boils down a Array to just 1 Value, that Value might very well be an Object, or a NEW ARRAY
// We could use Reduce Method to replace many of the other Methods that we have.
// The GOAL is to create an Object which contains the SUM of the Deposits and of the WithDrawals
// I want to calculate these 2 SUMS all at the SAME TIME in ONE GO using the Reduce Method
// 1st getting All 'movements' from 4 Objects that have Arrays, into this New 1 Array
// 2nd Adding the Reduce Method
// The GOAL was is to create an Object, so the starting point then also needs to be an Object
// 3rd It can be an Empty Object, or I could already start filling it, starting with { deposits: 0, withdrawals: 0 }
// 4th in the Function Body I could ask if the Current Value is a Deposit or Withdrawal
// 5th by checking if the Value is greater or below 0, cur > 0
// 6th using the Ternary Operator, if it IS, then I want to ADD the Current Value to the Deposits
// Into this Value here in the Object { deposits: 0,
// Here in this Callback Function THIS OBJECT { deposits: 0, withdrawals: 0 } is simply SUMS, which is the ACCUMULATOR
// So this  { deposits: 0, withdrawals: 0 } is the INITIAL VALUE of that ACCUMULATOR 'sums' (usually we wrote 0 instead)
// 7th So I can access the Deposits on 'sums.deposits'
// 8th and then add the Current Value to that 'sums.deposits += cur'
// 9th If not then I can add it to the Withdrawals 'sums.withdrawals += cur'
// 10th in an Arrow Function the Value is ONLY automatically when we DON'T have a Function Body with curly braces {}
//   {
//     cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//   },
// But I do have them, so that's why I need to explicitly (manually) RETURN the ACCUMULATOR from the Function
// That's how the Reduce Method works, we always have to RETURN the ACCUMULATOR from Each Iteration
// Usually it happens implicitly here if looking the Upper Example => (cur >= 1000 ? count + 1 : count)
// Destructuring 'sums' Object
// const sums = accounts
const { deposits, withdrawals } = accounts
  .flatMap(accnt => accnt.movements)
  .reduce(
    (sums, cur) => {
      // Less better way
      /* cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur); */

      // More better way
      // I can conditionally say, that I want to select Either Deposits or Withdrawals based on 'cur > 0' Condition
      // Using the [] Notation instead of a . Notation
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums; // I always need to Return in the end the Accumulator
    },
    { deposits: 0, withdrawals: 0 }
  );

// console.log(sums); // {deposits: 25180, withdrawals: -7340}
console.log(deposits, withdrawals); // 25180 -7340

// 4.)
// A Function that converts any String to a Title Case (all the words in a sentence are Capitalized, Except some of them.)
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1); // for FIXING this: and Here Is Another Title with an Example (and should NOT start lowerCase)

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with']; // words that should NOT be capitalized
  // Conversion
  // split() so I could work indicidually on Each of the words, when that's the case I need an Array
  // so I need to SPLIT this String into an Array, so that these words, which are separated by spaces, each of them are going to be 1 of the Elements of the Array
  // Map Method whenever I need a NEW Array with the SAME SIZE
  // word[0] I took the 1st Character of the String and putted toUpperCase
  // word.slice(1) I added the REST of the String to it (taking EVERYTHING starting at position 1)
  // for keeping the same length of Array, and using 'exceptions' for checking if the Current Word is INCLUDED in that Array
  // includes() returns a Boolean, so I'm gonna check if the word is in the 'exceptions'
  // if the word IS IN 'exceptions Array' then I wan't to Return that Word (without upperCase), otherwise I want to Return the Capitalized Version
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      // exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
      // after creating 'capitalize' Function
      exceptions.includes(word) ? word : capitalize(word)
    )
    .join(' '); // join for converting back to String
  // return titleCase;
  return capitalize(titleCase); // when I return the 'titleCase', I capitalize it again
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

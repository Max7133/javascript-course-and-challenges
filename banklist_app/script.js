'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
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

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// This Function will receive 1 Array of 'movements', and then work with that Data
// So in this case, that's the 'movements' that it should display, in the UI
// It's a good practice to pass the Data into a Function, intead of for example, having this Function work with a Global Variable
// That would work as well, but it is best to pass that Data DIRECTLY into the Function
const displayMovements = function (movements) {
  // Emptying the entire 'movements' Container first, and only then I will start adding New Elements
  // innerHTML is similiar to 'textContent'
  // Difference:
  // textContent returns the text itself
  // HTML returns everything, including the HTML (so all HTML tags WILL BE INCLUDED)
  containerMovements.innerHTML = '';

  // in this Function I need the movement, and current Index (mov, i)
  // starting with the 1st 'movement' down, and then adding the new ones on top.
  movements.forEach(function (mov, i) {
    // Checking if it is a deposit or withdrawal
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov} EUR</div>
  </div>`;
    // For adding 'movements' HTML on the webpage, I need to attach it into the Container ('movements' element)
    // insertAdjacentHTML excepts 2 Strings
    // 1st String is the position in which to attach the HTML ('afterbegin')
    // 'afterbegin' will insert New Child Element right after the beginning of the Parent Element ('containerMovements')
    // 2nd String is the String containing the HTML that I want to Insert (html)
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculating TOTAL Balance & displaying on the UI
const calcDisplayBalance = function (acc) {
  // Taking the 'movements' from the Account Object
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // Displaying it on the UI
  labelBalance.textContent = `${acc.balance} EUR`;
};

// it will receive the entire Account, then ill take the 'movemenents' and 'interest rate'  from the account
const calcDisplaySummary = function (acc) {
  // Calculating incomes, adding all positive Number together
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // Displaying it on the UI
  labelSumIn.textContent = `${incomes} EUR`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // Math.abs = for removing the -
  labelSumOut.textContent = `${Math.abs(out)} EUR`;

  // This bank pays out an Interest each time that there is a deposit to the bank account.
  // And that interest is 1.2% of the deposited amount.
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    // Now the bank only pays an interest if that interest is at least 1 EUR
    // Filtering the result of calling these interests here (deposit * 1.2) / 100) for Values that are at least 1
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest} EUR`;
};

// Now I want to compute 1 Username for Each of the account holders, in 'accounts' array
// I want to compute the username with it's initials 'stw'
// Transforming the string into the lowerCase
// Then I want to take the First Letter of each of the words, first I need to split up the String into multiple words
// Since Split Method turned the String into Array, I can now immediately call the Map Method here on this Resulting Array

const createUsernames = function (accs) {
  // I don't want to create a New Array, so I will use forEach Method
  // I just want to modify the Array I get as an Input
  accs.forEach(function (acc) {
    // Creating a New Property 'username' on each of the account Objects
    acc.username = acc.owner // (each of the Account Objects has the Owner Property) and I create this username from that, and create a new Property on that Account Element. That will then contain the 'username' that I created here.
      .toLowerCase()
      .split(' ')
      .map(
        name =>
          // In each Iteration I want to Return the First Letter
          name[0]
      )
      .join('');
    // In this Function I don't Return anything, I produce a side effect here, I'm doinf something to this 'acc' Object, so there is no need to Return anything. (I'm not creating a New Value to Return)
  });
};
// createUsernames('Steven Thomas Williams'); // (3) ['s', 't', 'w'] after Join stw
createUsernames(accounts);
console.log(accounts); // (4) [{…}, {…}, {…}, {…}]
// 1 of 4 Example 0:
/* interestRate: 1.2
movements: (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
owner: "Jonas Schmedtmann"
pin: 1111
username: "js"
[[Prototype]]: Object */

const updateUI = function (acc) {
  // Display movements
  // Calculating and displaying the balance, movements and summary as soon as we get the Data after succesfull LOGIN
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary (withous .movements, because I need the ENTIRE ACCOUNT)
  calcDisplaySummary(acc);
};

// EVENT HANDLERS
// When transfering money, I need to know from which 'account' that money should go
let currentAccount;

// Stopping the RELOAD after I click the button with the 'Event (e)' parameter
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // Prevents this form from submitting
  console.log('LOGIN');

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount); // After typing 'js'
  // {owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js'}

  // Checking if the PIN is entered correctly
  // I'm converting it to a Number because the value is a String
  // if (currentAccount?) I putted '?' so it would read it, if the currentAccount EXISTS
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0] // [0] Jonas
    }`;
    // After succesfull login, it will set the opasity from 0 to 100, and it will show the container with transactions
    containerApp.style.opacity = 100;

    // Remove the input from login fields after ENTER
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // removes clicked input field after

    // UPDATE UI
    updateUI(currentAccount);
  }
});

// I need Event (e)
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //preventDefault() so it will no reload after I click the button
  const amount = Number(inputTransferAmount.value);
  // Account where I want to transfer money
  // I look here for the Account which has this Value (inputTransferTo.value), the username value that I input to that form, so to which I want to transfer
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // Clearing the input field from 'Transfer Money'
  inputTransferAmount.value = inputTransferTo.value = '';

  // Checking if I have enough money, if the Value is not negative
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    // removing 'movements' from MY Account and adding them to ANOTHER Account
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // inputCloseUsername.value needs to be the same as the username in the current account
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // Calculating the Index that I want to delete
    // Its gonna loop over the Array, and in each iteration, I get accesss to the Current Account
    // The I want to find the one where the account has the username === currentAccount.username
    // the findIndex Method will the return the Index of the 1st Element in the Array that matches this condition
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // DELETING THE ACCOUNT (Splice Method Mutatates the underlying Array itself)
    console.log(index);
    accounts.splice(index, 1);

    // Hiding the CONTAINER of transfers
    containerApp.style.opacity = 0;

    // Big Difference with indexOf Method is that I can only search for a Value that is in the Array.
    // If the Array contains the 23, then it's true, if not then false
    // .indexOf(23)
  }
  // Removing the input from Close account field
  inputCloseUsername.value = inputClosePin.value = '';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/////////////////////////////////////////////////////////   T H E   f i n d I n d e x   M E T H O D   /////////////////////////////////////////////////////////
// findIndex Method works almost the same as the Find Method, but, findIndex Method returns the INDEX, of the found Element and not the Element itself.
// Both the Find & findIndex Method besides the Current Element, get access to also the Current Index and the Current Entire Array

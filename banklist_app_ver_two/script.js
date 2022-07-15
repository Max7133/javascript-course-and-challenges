'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-07-08T16:32:36.790Z',
    '2022-07-10T16:32:36.790Z',
    '2022-07-12T16:32:36.790Z',
  ],
  currency: 'EUR',
  locale: 'fi-FI', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2022-07-10T16:32:36.790Z',
    '2022-07-12T16:32:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

// Function that receives a Date and Locale as an input, Returns formated Date
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    // Math.abs REMOVES Negative Value
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)); // converting to Days;
  // [i] - current Index in the 'movements' Array, and it's the same Index that going to point to the equivalent Date in this 'movementsDate' Array
  // common techinique of looping over 2 Arrays at the same time
  // new Date for nicely formatted time String, and I use this String for creating a New Date Object
  // I need that Object so that then from there, I can call the usual Methods to get the Date, Month, Year
  // Calculating how many Days passed since the current Date and between the Date
  // New Date() === Current Date - Date that got just received
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  // If I want to do something today, Return NOT the Current Date, but instead Today
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`; // Number of Days passed

  // Return the Actual Date
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0); // it's 0 based, so I add 1 here
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date); // the Date I receive from the input: const formatMovementDate = function (date, locale)
};

// Formatting Currencies Function
// Universal Function that will take any value, locale, currency
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// const displayMovements = function (movements, sort = false)
// Passing the Entire Account not just 'movemenets'
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    // will display Date in the HTML in every withdrawal, deposit ('movements' Array)
    const displayDate = formatMovementDate(date, acc.locale); // passed the 'locale' Object here, acc.locale because: const displayMovements = function (acc, sort = false)

    // Formatting with Internalization API
    /*     // 2 Parameters: 1st acc.locale, 2nd options Object {} that I straight define there
    // on this Formatter I call the format Method
    const formattedMov = new Intl.NumberFormat(acc.locale, {
      style: 'currency',
      currency: acc.currency,
    }).format(mov); */
    // Formatting with Internalization API (with Universal Function)
    // 3 Arguments: value = mov, locale = acc.locale, currency = acc.currency
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div> 
      </div>
    `;
    // toFixed(2) === Number.00, toFixed() === Number, toFixed(1) === Number.0
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  // displayMovements(acc.movements);
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Starts the LOGOUT TIMER FUNCTION
const startLogOutTimer = function () {
  // I putted 'tick' to call this Function immediately, without the 1 sec delay
  const tick = function () {
    // Converting to minutes and seconds
    // Also converting to String, removing decimal parts with Math.trunc and adding extra 0 with padStart
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;
    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer); // for stopping the Timer
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // Decrease 1 second
    time--;
  };
  // Set time to 5 minutes
  let time = 300;
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer; // clearing the timer
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer; // timer needs to be a Global Variable, I need this Variable to persist between different logins.

// Faked LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Login
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create Current Date and Time
    /*  // day/month/year, XX:XX
    const now = new Date();
    // adding 0 before date Number with padStart Method
    // `${now.getDate()}` is now a String, .padStart(2, 0) for displaying only 2 Digits, and Padding with '0' if the day is less than 10
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0); // it's 0 based, so I add 1 here
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);
    // building a String from that
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`; */

    // Create Current Date and Time with an API
    // Experimenting with API
    const now = new Date();
    // Defining Options Object for adding Hours & Minutes
    const options = {
      minute: 'numeric',
      hour: 'numeric',
      day: 'numeric',
      month: 'numeric', // long - July, 2-digit - 07, numeric - 7
      year: 'numeric',
      // weekday: 'long', // short - Tue, narrow - T
    };
    // Getting the 'Locale' from User's Browser
    // const locale = navigator.language;
    // console.log(locale);

    // new Intl - Namespace for the Internationalization API
    // .DateTimeFormat() - for Times & Dates
    // 'en-US' - Local String (language/COUNTRY)
    // .format(now) - Date I want to Format
    // Adding 'options' Object as a 2nd Argument into the DateTimeFormat Function
    // labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale, // will set the 'locale' that I defined in each User
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Terminating the 1st timer, if the 2nd timer is triggered, when logging in to another account
    if (timer) clearInterval(timer);

    // Logged Out In Timer
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer Date
    currentAccount.movementsDates.push(new Date().toISOString()); // it will push New Current Date in each new deposit/withdrawal
    receiverAcc.movementsDates.push(new Date().toISOString()); // toISOString() Very useful case is when I want to Convert a particular Date Object into a String that I can then store somewhere

    // Update UI
    updateUI(currentAccount);

    // Reset the Timer (after making a transfer)
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // The Value that we get from the loan, needs to be Rounded Down (no need to convert THIS to a Number)
  // The Map.floor() does Type Coercion itself, and I use it because I simply want to Round any Value DOWN (150.53 to 150)
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Setting the delay for 2.5 seconds after I submit the loan
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan Date
      currentAccount.movementsDates.push(new Date().toISOString()); // toISOString() Very useful case is when I want to Convert a particular Date Object into a String that I can then store somewhere

      // Update UI
      updateUI(currentAccount);

      // Reset the Timer (after making a transfer)
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500); // After 2.5 seconds, the loan will transfer
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

'use strict';

/////////////////////////////////////////////////   A N O T H E R   C L A S S E   E X A M P L E   /////////////////////////////////////////////////

class Account {
  // Each 'account' should have the 'owner' name, currency, pin
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    // I can create even MORE Properties on Any Instance and Properties that are NOT based on any inputs.
    this.movements = [];
    // Same now I can write for 'locale', and it will work
    this.locale = navigator.language;
    // Also I could even execute any code here in this Constructor that I want
    console.log(`Thanks for opening an account, ${owner}`);
  }
  //// Deposits & Withdrawals

  // It's a lot better to create Methods that interact with these Properties.
  // and that is especially true for Important Properties, such as these 'movements' here

  //// GOOD WAY
  // Public Interface (API)
  deposit(val) {
    this.movements.push(val);
  }

  // This shouldn't be accessible from Outside of the Class!
  withdraw(val) {
    // Here I can call 'deposit' Method (I can call Other Methods inside of certain Method)
    this.deposit(-val); // using THIS Keyword to be able to access 'deposit' Method
  } // This Method abstract the fact that a Withdrawal is a Negative 'movement'

  // For e.g. let's say we have a requestLoan Method here for some Value (this was also a functionality of the Bankist app)
  // So I could make the approval of the Loan based on some condition, and that condition could come from some Other Method.

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    // If the loan is approved,
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

// Creating a New Account
const acc1 = new Account('Vitautas', 'EUR', 1108);

//// BAD WAY
// Deposit
//acc1.movements.push(20);
// Withdrawal
//acc1.movements.push(-5);

acc1.deposit(20);
acc1.withdraw(5); // now I don't need to write -5 here

console.log(acc1); // Inside Account: movements: (2) [20, -5]

// I can access the 'pin' from outside of the 'acc1', but it shouldn't be accessible from Outside of the Class
console.log(acc1.pin);

// In the Public Interface, we only want 'requestLoan' Method
// So, we want to be able to do this here basically
acc1.requestLoan(1000); // Loan approved (AND IT WAS PUSHED INTO THE 'movements' ARRAY)
// But, of course, we are ALSO able to do this.
acc1.approveLoan(1000); // This won't do Anything, but in the Real World, we should NOT even be allowed to access this kind of Method.

// approveLoan() is kind of an Internal Method that ONLY the requestLoan Method should be able to use. (WE NEED DATA ENCAPSULATION AND DATE PRIVACY)

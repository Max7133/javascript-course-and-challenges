'use strict';

/////////////////////////////////////////////////   A N O T H E R   C L A S S   E X A M P L E   /////////////////////////////////////////////////

class Account {
  // Each 'account' should have the 'owner' name, currency, pin
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protecting the PIN
    this._pin = pin;
    // I can create even MORE Properties on Any Instance and Properties that are NOT based on any inputs.
    this._movements = []; // PROTECTED PROPERTY
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
  getMovements() {
    // I could also create a GETTER here INSTEAD of this Method
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  // This shouldn't be accessible from Outside of the Class!
  withdraw(val) {
    // Here I can call 'deposit' Method (I can call Other Methods inside of certain Method)
    this.deposit(-val); // using THIS Keyword to be able to access 'deposit' Method
  } // This Method abstract the fact that a Withdrawal is a Negative 'movement'

  // For e.g. let's say we have a requestLoan Method here for some Value (this was also a functionality of the Bankist app)
  // So I could make the approval of the Loan based on some condition, and that condition could come from some Other Method.

  // Protected approvedLoan Method
  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    // If the loan is approved,
    if (this._approveLoan(val)) {
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
console.log(acc1._pin);

// In the Public Interface, we only want 'requestLoan' Method
// So, we want to be able to do this here basically
acc1.requestLoan(1000); // Loan approved (AND IT WAS PUSHED INTO THE 'movements' ARRAY)
// But, of course, we are ALSO able to do this.
acc1._approveLoan(1000); // This won't do Anything, but in the Real World, we should NOT even be allowed to access this kind of Method.

// approveLoan() is kind of an Internal Method that ONLY the requestLoan Method should be able to use. (WE NEED DATA ENCAPSULATION AND DATE PRIVACY)

/////////////////////////////////////////////////   E N C A P S U L A T I O N :   P R O T E C T E D   P R O P E R T I E S   A N D   M E T H O D S   /////////////////////////////////////////////////
//// ENCAPSULATION means to KEEP some Properties and Methods PRIVATE inside the Class (so that they are NOT ACCESSIBLE from outside of the Class.)
//// Then the rest of the Methods are basically EXPOSED as a Public Interface, which we can also call API.
//// 2 BIG REASONS WHY WE NEED ENCAPSULATION AND DATA PRIVACY

//// 1st Reason: Is to Prevent Code from Outside of a Class to accidentally Manipulate our data Inside the Class.
// Example:
//// BAD WAY
// Deposit
//acc1.movements.push(20);
// Withdrawal
//acc1.movements.push(-5); // WE ARE NOT SUPPOSED TO MANUALLY MESS WITH THIS PROPERTY AND THEREFORE WE SHOULD ENCAPSULATE IT!

//// 2nd Reason: When we EXPOSE only a small Interface (a small API) consisting only of a few Public Methods,
//// then we can change all the Other Internal Methods with more condifence.
//// Because in this case, we can be sure that External Code does not rely on these Private Methods!
//// And so therefore our Code will NOT BREAK when we do Internal changes.

//// SO THAT'S WHAT ENCAPSULATION AND DATA PRIVACY ARE AND THE REASON FOR IT.

//// However JavaScript Classes actually DO NOT YET SUPPORT Real Data Privacy and Encapsulation.
//// There is a proposal to add truly Private Class fields and Methods to the language, BUT IT'S NOT COMPLETELY READY YET.

// But even when this Feature ships in the Browser it will take some time until we can use it with confidence.
// So here, for now, we will basically Fake Encapsulation by using a Convention.

// I'm going to protect the 'movements' Array, because it contains CRITICAL DATA and I will protect this Data, so that no one can accidentally Manipulate it.
// For now I will just add '_' underscore in front of the Property name and that's it, and then I need to change it EVERYWHERE.
// this.movements = []; --> this._movements = [];
// So THIS DOES NOT actually make the Property truly Private because this is just a Convention. (Something that Developers agree to use and then Everyone does it this way.)
// But since it is NOT TRULY PRIVATE we call this PROTECTED.
// And so now if I wanted to get the 'movements' Outside here, I could of course still do this.
// which is that the Data here is of course STILL ACCESSIBLE if I use this Underscore outside here as well.
// at least now Everyone on the 'team' will know that this Property is NOT SUPPOSED to be touched Outside of the Class.

// Deposit
acc1._movements.push(200);
// Withdrawal
acc1._movements.push(-50);

// If I STILL wanted to Give Access to the 'movements' Array from the Outside, then I would have to Implement a Public Method for that.

// getMovements() {
//   return this._movements;
// }

// And now this would be the Correct Way to GET the 'movements'
// So this one everyone can still at least access the 'movements' but they CANNOT OVERRIDE THEM. (they CANNOT SET the 'movements')
// Unless of course they use the UNDERSCORE with the Convention, but then at least they will know that it's wront to Access the Property.
console.log(acc1.getMovements());

'use strict';

/////////////////////////////////////////////////   E N C A P S U L A T I O N :   P R I V A T E   C L A S S   F I E L D S   A N D   M E T H O D S   /////////////////////////////////////////////////
//// PRIVATE CLASS FIELDS AND METHODS are actually part of a Bigger proposal for Imporving and Changing JavaScript Classes which is simply called Class fields.
//// Class Fields proposal is currently at Stage 3, so right now it's actually NOT YET PART OF the JavaScript language.
//// However, being at Stage 3 means that it's very likely that at some point, it will move forward to Stage 4, and then it will actually become a part of the JavaScript language.
//// It's called Class Fields, because in traditional OOP languages like Java and C++, Properties are usually called Fields.
//// What this means is that with this new Proposal, JavaScript is moving away from the idea that Classes are just 'Syntatic Sugar' over Constructor Functions.
//// Because with this New Class Features, Classes actually start to have abilities that we didn't previously have with Constructor Functions.
//// In this Proposal, there are actually 4 different kinds of Fields and Methods, and actually it's even 8, but here we just gonna use 4.
//// 1st: Public Fields
//// 2nd: Private Fields
//// 3rd: Public Methods
//// 4th: Private Methods
//// 5, 6, 7, 8th There are also a STATIC VERSION of these 4

class Account {
  // We can think of a Field as a Property that will be on All Instances. (that's why we can also call it a Public Instance Field)
  // In this Example, the 2 Fields could be 'movements' and 'locale', because these are 2 Properties that are gonna be on All the Objects that we create with this Class
  // because we do not pass Any of the Values here in, into the Constructor
  // so the 'navigator' Array and '.language' will always be Set for All the Instances, so I'm gonna add them as Public Fields

  //// PUBLIC FIELDS (INSTANCES) - THATS WHY I WILL SEE THEM STAIGHT IN THE CONSOLE.LOG AND NOT INSIDE THE PROTOTYPE!!!
  // I will still see the 'locale' and 'movements' after the Reload, but NOW they are actually Public Fields, but in my Final Object Here, that Doesnt't make Any difference.
  // Because, these Public Fields here are gonna be Present on All the Instances that I'm creating through the Class, so they are NOT on the Prototype (IMPORTANT TO UNDERSTAND)
  // but unlike the Methods, that I add here, they WILL always be Added to the Prototype, but the Public Fields ARE ON THE INSTANCES AND NOT ON A PROTOTYPE!!!
  // These Public Field are the same as the bellow e.g. //this._movements = []; //this.locale = navigator.language;
  // and therefore these Public Fields they're also referenceable by the THIS Keyword, and also referenceable via the THIS Keyword.
  locale = navigator.language; // here, we actually NEED to write a semi colon (and I DON'T NEED to declare it with 'const' or 'let' )

  //// PRIVATE FIELDS (INSTANCES) - THATS WHY I WILL SEE THEM STAIGHT IN THE CONSOLE.LOG AND NOT INSIDE THE PROTOTYPE!!!
  // With Private Fields we can now make it so that Properties are really truly NOT ACCESSIBLE from the outside.
  // Making the 'movements' Array PRIVATE
  #movements = []; // by adding the # Symbol (this is the Syntac that makes a Field PRIVATE in this new Class Proposal.)
  // so what I have to do is to create the Field out here.
  #pin; // AND THEN DON'T SET IT TO ANYTHING!!! (this is like creating an Empty Variable) in the beginning, it will be set to Undefined, and BELLOW I can REDEFINE that Value basically.
  // No we can see that these PRIVATE CLASS FIELDS are really just like Any Other Property. That's why bellow I can then access it on the THIS Keyword, this.#pin = pin; and Set it to the Value that I received.

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // I want to make the 'pin' PRIVATE, but this time the situation is a bit Different
    // because now I'm actually setting the 'pin' based on this Input Value to the Constructor.
    // however we CANNOT DEFINE a Field in the Constructor (the Fields, they really have to be out here outside of Any Method)

    this.#pin = pin;
    //this._movements = [];
    //this.locale = navigator.language;
    console.log(`Thanks for opening an account, ${owner}`);
  }

  //// PUBLIC METHODS

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    //if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }

  // STATIC METHOD (Usually we use this for HELPER FUNCTIONS)
  // Because these Static Methods WILL NOT BE AVAILABLE on all the Instances, but ONLY on the Class Itself.
  static helper() {
    console.log('Helper');
  }

  //// PRIVATE METHODS
  // Private Methods are very useful to HIDE the Implementation Details from the Outside.
  //#approveLoan(val) { // NO BROWSER CURRENTLY SUPPORT THIS
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Vitautas', 'EUR', 1108);

acc1.deposit(20);
acc1.withdraw(5);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);

// Now I can see that the 'movements' Property is indeed PROTECTED. (but in the Console inside of the 'Account' Class I could still find the '#movements' Array)
//console.log(acc1.#movements); // SYNTAX ERROR
//console.log(acc1.#pin); // SYNTAX ERROR
//console.log(acc1.#approveLoan(100)); // SYNTAX ERROR (CHROME currently sees this as a Private Class Field and NOT as a Method)

// The Static Method only works like this
Account.helper(); // Helper

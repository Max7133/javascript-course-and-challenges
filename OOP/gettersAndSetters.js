'use strict';

/////////////////////////////////////////////////   G E T T E R S   &   S E T T E R S   /////////////////////////////////////////////////
//// Every Object in JavaScript can have Setter and Getter Properties,
//// these Special Properties are called Assessor Properties, while the more normal Properties are called Data Properties.
//// So Getters & Setters are basically Functions that Get and Set a Value just as the name says,
//// but on the outside they still look like Regular Properties.

//// Getters & Setters in Object Literal
const account = {
  owner: 'Vitas',
  movements: [20, 50, 70, 500],

  //// Getter
  // Adding a Getter to this Object, is to write a Normal Method
  // I want to Get the LATEST 'movement'
  get latest() {
    return this.movements.slice(-1).pop(); // But this is gonna Return an Array with the Last Position, so I'm going to take it OUT with the pop()
  },

  //// Setter
  // Adding a new 'movement' to the Array
  // Any Setter Method NEEDS TO HAVE exactly 1 Parameter
  set latest(mov) {
    // It's NOT MANDATORY to specify a Setter when we have a Getter for the SAME PROPERTY (Just a GETTER or just a SETTER IS ENOUGH)
    this.movements.push(mov);
  },
};

// Using the Getter
// But I use it as a Property, I don't call the Method, instead I write it as if it was just a Property.
console.log(account.latest); // 500

// Using the Setter
// Setter is also like a Property and NOT a Method, I can simply Set it just like I set any Other Property
account.latest = 60;
console.log(account.movements); // (5) [20, 50, 70, 500, 60]

//// Getters & Setters in Classes
//// Works in the Exact Same Way

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2022 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  // Adding a Getter for the 'age' Property
  get age() {
    return 2022 - this.birthYear; // Like this, I will be able to read the 'age' of Any Object using a Property
  } // the Getter is just like any other Regular Method that we Set on the Prototype.

  //// CREATING A SETTER FOR A PROPERTY NAME THAT DOES ALREADY EXISTS
  // Now what's gonna happen is that Each Time the code in the constructor() will be Executed
  // so whenever I set the fullName on the This Keyword then actually this Method here bellow (the Setter) will be executed intead!
  // so that fullName in the Constructor will become THIS name in HERE set fullName(name) {...}
  set fullName(name) {
    console.log(name);
    // Setters and Getters can actually be very useful for Data Validation
    // E.G. Validation with the NAME
    // Creating a Setter for the fullName Property, which will check if the NAME is actually FULL NAME (With Space/s)
    // if the name has a Space, then set this fullName to name
    if (name.includes(' ')) this._fullName = name;
    // _fullName <-(that is the convention for writing a New Property Name)
    // when we have a Setter which is trying to set a Property that does already exist, then here as a Convention we add an '_' Underscore.
    // OTHERWISE I WILL GET AN ERROR IF I JUST WRITE fullName -> the Error that I will get: Uncaught RangeError: Maximum call stack size exceeded
    // WITHOUT UNDERSCORE I will get a CONFLICT, because, both the Setter Function and the Constructor Function will try to Set the Exact Same Property Name.
    // This is just a Convention and NOT a JavaScript feature, it is just to Avoid that NAMING CONFLICT
    //
    else alert(`${name} is not a full name!`);
  }
  // However, doing this (if (name.includes(' ')) this._fullName = name) we actually CREATING a New Variable with the name _fullName
  // If I check the Console in the PersonCl, inside there will be only one Property that Exist is _fullName, and fullName Property will be GONE (e.g. vitas.fullName = undefined)

  // To FIX THIS, I also need to create a Getter for the fullName Property
  get fullName() {
    return this._fullName;
  }
  // Now if I check the Console in the PersonCl, I will have fullName there, and it will also have the Actual Property that is there _fullName
}
const vitas = new PersonCl('Vitautas Green Onion', 1992); // Vitautas Green Onion
const tomas = new PersonCl('Thomas', 1999); // Thomas (He doesn't have _fullName) will also get an Alert: Thomas is not a full name!
// Now if I check the Console in the PersonCl for 'tomas, he will NOT have fullName/_fullName Property there at all

// Using the Getter
console.log(vitas.age);

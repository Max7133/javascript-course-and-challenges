'use strict';

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  // I receive this 'charge', as an Input here --> this.charge = charge;
  // that's why I still need to define all the Fields OUTSIDE of Any Method! (that is True for both Private & Public Fields)
  #charge; // In this case it's a Private Field, and I Don't give it Any Value.
  constructor(make, speed, charge) {
    super(make, speed); // super is WITHOUT the THIS Keyword, and I dont't need to Call CarCl like this --> CarCl.call(this, make, speed)
    this.#charge = charge; // and here I reassign it by adding # to it, and then chainge it Everywhere adding the #
  }

  // This Method hare is basically a Public API, so that I can manipulate the 'charge' Property from Outside (but Without being able to Directly access the Property from the Outside!)
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const bmw = new CarCl('BMW', 130);
console.log(bmw);
bmw
  .accelerate() // BMW is going at 140 km/h
  .accelerate() // BMW is going at 150 km/h
  .accelerate() // BMW is going at 160 km/h
  .accelerate() // BMW is going at 170 km/h
  .brake() // BMW is going at 165 km/h
  .brake() // BMW is going at 160 km/h
  .brake() // BMW is going at 155 km/h
  .brake(); // BMW is going at 150 km/h

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian); // EVCl {make: 'Rivian', speed: 120, #charge: 23}
//console.log(rivian.#charge); // Won't work! It is now truly Private and it is Encapsulated inside of the Class!
// so from Outside there is No Way of changing it, except of course by 'chargeBattery()' or by 'accelerate()'

rivian
  .accelerate() // Rivian is going at 140 km/h, with a charge of 22
  .accelerate() // Rivian is going at 160 km/h, with a charge of 21
  .accelerate() // Rivian is going at 180 km/h, with a charge of 20
  .brake() // Rivian is going at 175 km/h
  .chargeBattery(50)
  .accelerate(); // Rivian is going at 195 km/h, with a charge of 49

// Child Class 'EVCl' does also Inherit the Getters and Setters from the 'CarCl' Parent Class.
// So I can also do this..
// speedUS is a Setter and a Getter that I defined in the Parent Class 'CarCl'
console.log(rivian.speedUS); // 121.875 (this is 195 km/h converted to mi/h)

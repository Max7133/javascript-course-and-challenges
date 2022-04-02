'use strict';

///////////////////   W O R K I N G   W I T H   S T R I N G S   ///////////////////////

const airline = 'TAP Air Portugal';
const plane = 'A320';

// Position
console.log(plane[0]); // A
console.log(plane[1]); // 3
console.log(plane[2]); // 2
console.log('B737'[0]); // B

// Length
console.log(airline.length); // 16
console.log('B737'.length); // 4

// Methods
// Gets the position in which a certain letter is in the String
console.log(airline.indexOf('r')); // 6 (counts from 0 index)
console.log(airline.lastIndexOf('r')); // 10 (counts from the last index)
// Search for the entire words
console.log(airline.indexOf('Portugal')); // 8 (8 letters in Portugal)
console.log(airline.indexOf('portugal')); // -1 (because there is no portugal)

// Slice Method
// (4) is the begining parameter where the extraction will start
// (7) is the end of slice, its stopes before reaching index 7
// The length of the extracted string, is always going to be end minus beginning (7 - 4 = 3 length of Air)
console.log(airline.slice(4)); // Air Portugal (Substring) - Part of the original string
console.log(airline.slice(4, 7)); // Air

// Extracting the first string of the 'airline' variable, without knowing any of the indexes
// so I don't have to hardcode the values like (4, 7)
// Extracting first word, if I want the first word I Start at 0 and End until the indexOf(' ') (it will be the first occurence)
console.log(airline.slice(0, airline.indexOf(' '))); // TAP
// For getting the last word
// I don't need the end parameter, it will extract everything until the end
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Portugal

// I can define a negative begin agrument, and it will start extracting from the end
console.log(airline.slice(-2)); // al (last 2 letters of Portugal)
// Negative end parameter
console.log(airline.slice(1, -1)); // AP Air Portuga

console.log(airline.slice(-1)); // l (last index letter)

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  // I want to check if the String that I receive contains B or an E, if yes, then it's a middle seat
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat :(');
  else console.log('You got lucky :)');
};
checkMiddleSeat('11B'); // You got the middle seat :(
checkMiddleSeat('23C'); // You got lucky :)
checkMiddleSeat('3E'); // You got the middle seat :(

// Why it works ? Strings are just Primitives, why they have methods ? Methods need to be in Objects such as Arrays ?
// Whenever we call a method on a string JavaScript will automatically behind the scenes, convert that String Primitive to a String Object with the same content
// And then it's on that Object where the Methods are called (this process is called Boxing)
// Because it takes the String and puts it into a box which is an Object
// Example
console.log(new String('max')); // String {'max'}
console.log(typeof new String('max')); // object

// When the operation is done, the Object is converted back to a regular String Primitive
// All String Methods return Primitive Values, even is called on a String Object
console.log(typeof new String('max').slice(1)); // string

// CHANGING THE CASE OF A STRING
console.log(airline.toLowerCase()); // tap air portugal
console.log(airline.toUpperCase()); // TAP AIR PORTUGAL
console.log('max'.toUpperCase()); // MAX

// Fix capitalization in name
const passenger = 'jOnAs'; // Jonas
const passengerLower = passenger.toLowerCase(); // jonas
// Now I take the First Letter, and the the Rest of the string, and put these 2 parts together
const passengerCorrect =
  passengerLower[0].toUpperCase() + // J
  passengerLower.slice(1); // onas
console.log(passengerCorrect); // Jonas

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
// Now I compare email and loginEmail if they are the same
// 1 step convert it into lowercase
const lowerEmail = loginEmail.toLowerCase();
// 2 step get rid of all the empty spaces and Enter \n'
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail); // hello@jonas.io
// Better than step 2 example
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail); // hello@jonas.io
console.log(email === normalizedEmail); // true

// REPLACING PARTS OF STRINGS (ES2019)
const priceGB = '288,97£';
// I want to compute the price in US
// 2 arguments, the First one is the one I want to replace '£'
// Second argument is the String '$' that will replace the first one '£'
// Lastly I want to replace ',' with a '.'
// Replace Method creates new String, it dosen't change the original one !
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS); // 288.97$

// REPLACING ENTIRE WORDS
const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
// Replacing 'door' with 'gate'
console.log(announcement.replace('door', 'gate')); // All passengers come to boarding gate 23. Boarding door 23!
// Using a Regular Expression (telling the Replace Method that it should replace all 'door' occurances)
// And then to create a regular Expression, I need to write the String between Slashes and add 'g' (stands for Global)
console.log(announcement.replace(/door/g, 'gate')); // // All passengers come to boarding gate 23. Boarding door 23!
// ES2021 (Best Way)
console.log(announcement.replaceAll('door', 'gate')); // All passengers come to boarding gate 23. Boarding door 23!

// Replace Method is Case Sensitive(like all other String Methods)

// They are 3 simple Method that return Booleans (includes, startsWith, endsWith)
// Booleans
const planeTwo = 'Airbus A320neo';
console.log(planeTwo.includes('A320')); // true
console.log(planeTwo.includes('Boeing')); // false
console.log(planeTwo.startsWith('Airb')); // true

// Checking if the current plane is a part of the new airbus family
if (planeTwo.startsWith('Airbus') && planeTwo.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

// Practice exercise
// We want to check if the baggage of the certain passenger is allowed to be checked-in
const checkBaggage = function (items) {
  // When we receive Input from a user, we usually always start by putting everything into lowercase
  // lowercase because in the fun call, we have a person that has Knife and Food written in capital letters
  // if I didn't convert this to lowercase, then the includes('knife') would be False
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('I have a laptop, some Food and a pocker Knife'); // You are NOT allowed on board
checkBaggage('I have socks and a camera'); // Welcome aboard!
checkBaggage('Got some snacks and a gun for protection'); // You are NOT allowed on board

// SPLIT METHOD

console.log('a+very+nice+string'.split('+')); // (4) ['a', 'very', 'nice', 'string']
console.log('Maksim Pa'.split(' ')); // (2) ['Maksim', 'Pa']

// JOIN METHOD
const [firstName, lastName] = 'Maksim Pa'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

// Capitalazing first letter of words
const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  console.log(names);

  for (const n of names) {
    // lopping over and pushing in to a new array
    // First way
    // namesUpper.push(n[0].toUpperCase() + n.slice(1)); // joined it with the rest of the word starting from position 1
    // Second way
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' ')); // Jessica Ann Smith Davis
};

capitalizeName('jessica ann smith davis');
capitalizeName('maksim pas');

// PADDING A STRING
// Add a number of character to the String until the String has a certain desired length
const message = 'Go to gate 23!';
// padStart() will add some characters to the beginning of the String
// first argument is the Length of the String
// second argument is the Character I want to Pad the String with
console.log(message.padStart(25, '+')); // +++++++++++Go to gate 23!

// PAD ENT (taking this result, and immediately also pad the end of the String)
// It will add 5 '+' to the end of the String
console.log(message.padStart(25, '+').padEnd(30, '+'));

// Credit card masking example
const maskCreditCard = function (number) {
  // converting number to a String
  const str = number + ''; // 'number'
  const last = str.slice(-4); // I took the last 4
  return last.padStart(str.length, '*'); // then I padded the rest of the string, until it matched the original length of the string (8) <- in first example
};
console.log(maskCreditCard(33141235)); // ****1235
console.log(maskCreditCard(33141235135315)); // **********5315
console.log(maskCreditCard('324234234123414123')); // **************4123

// REPEAT METHOD

const repeatingMessage = 'Bad weather.. All Departures Delayed... ';
console.log(repeatingMessage.repeat(5)); // It will repeat the message 5 times

// it will repeat as many times as there are planes waiting
const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};
planesInLine(5); // There are 5 planes in line ✈️✈️✈️✈️✈️
planesInLine(3); // There are 3 planes in line ✈️✈️✈️
planesInLine(12); // There are 12 planes in line ✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️✈️

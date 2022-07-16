'use strict';

////////////////////////////////////////////   S T Y L E S   A T T R I B U T E S   C L A S S E S   ////////////////////////////////////////////

// PREVIOUS LECTURE EXAMPLE
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove()
    message.parentElement.removeChild(message);
  });

//// STYLES
// INLINE STYLES
// Setting the Style on the Element - get Element.style.PropertyName & String with the Value
message.style.backgroundColor = '#37383d'; // dark blue color
// Setting the width and writing the CSS Value exactly as we would do in CSS, so I always have to INCLUDE the Unit
message.style.width = '120%';
// (These style are actually set as INLINE STYLES, so styles set Directly here in the DOM)

// Using the STYLE Property like this here, ONLY WORKS for Inline Styles, that we set ourselves also using this style Property
// We cannot get a style that is hidden inside of a Class or maybe that doesn't even exist.
console.log(message.style.height);
// So it WILL WORK for tha backgroundColor, because I did set it myself and it is an Inline Style
console.log(message.style.backgroundColor); // rgb(55, 56, 61)
// I want to get the Color, and Color IS DEFINED in the style sheet
console.log(message.style.color); // NOTHING

// COMPUTED STYLES
// To get the styles, I need to use the getComputedStyle Function
// This is a Computed Style which means that it's the Real Style as it appears here on the Website
// Even if I do not declare it in the CSS, for example the .height BELLOW, I didn't define it myself,
// but the Browser needed to calculate the height to display it, and so I can then get access to that Value (which is shown bellow = 49.2px)

// And here I need to pass in the Element (message)
console.log(getComputedStyle(message)); // CSSStyleDeclaration {0: "align-content", 1:"align-items", 2: ...}
// I got this huge Object and it contains ALL of the Properties with ALL of the Values
// So in practice, what we do is to simply take a certain Property, for ex Color from there
console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 49.2px

// Increasing the height of 'message' banner by 40px (previous result 49.2px)
// This will be a Problem because the value here itself comes in Pixels, but 'getComputedStyle(message).height' is a String
// So here I try to add a Number to a String which WILL NOT WORK
//message.style.height = getComputedStyle(message).height + 40 + 'px';
// To FIX, I need to use a Function which can take the Number out of this String '49.2px' (Parse the Number from here)
// And this Function is Number.parseInt or parseFloat, also I need to specify Number 10 in this Function
// It will take the number 49.2 (Without 'px') added 30 and added the 'px' there
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//// CSS CUSTOM PROPERTIES (CSS VARIABLES)
// These CSS Variables are defined in the Document Root
// In JavaScript that is equicalent to the Document (Document Element)
// this is the root in CSS -> document.documentElement;
// after setProperty I write the name of the Custom Property
// So then I want to change the Primary Color '--color-primary' and then the Value I want to set it to 'orangered'
document.documentElement.style.setProperty('--color-primary', 'orangered');
// I can do the same for All Properties, I could also use setProperty to set the Color or the backgroundColor or the Width

//// ATTRIBUTES
// Selecting and Changing the Logo of the Website
// The Class of the Logo is '.nav__logo'
const logo = document.querySelector('.nav__logo');

// Now I can access some of these Default Properties

// This works on Images they are suppose to have the ALT and the SRC Attributes on them
console.log(logo.alt); // Bankist logo
console.log(logo.src); // http://127.0.0.1:8080/img/logo.png <- ABSOLUTE URL not RELATIVE URL -> "img/logo.png"
// If I specify ALT or SRC in HTML then JavaScript will automatically create these Properties on the Object

// A bit different BUT WORKS
console.log(logo.className); // nav__logo <-- It is a Class name of this Element

// Non-standard
// But if I add some Other Property that is NOT a standard, then JavaScript WILL NOT automatically create a Property on the Object
// Proof: After I added 'designer' Property in the index.html and setted it to Jonas
console.log(logo.designer); // undefined (IT'S STILL UNDEFINED)'

// But there is ANOTHER WAY to read this Value from the DOM
// using getAttribute and passing the String 'designer'
console.log(logo.getAttribute('designer')); // Jonas

// Setting Attributes
logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt); // Beautiful minimalist logo

// There is also the opposite of getAttribute, which is setAttribute
// Changing 'company' to 'Bankist'
logo.setAttribute('company', 'Bankist');

// ABSOLUTE URL
console.log(logo.src); // http://127.0.0.1:8080/img/logo.png

// Getting RELATIVE URL -> "img/logo.png"
console.log(logo.getAttribute('src')); // img/logo.png

// Getting the Link
const link = document.querySelector('.nav__link--btn');
// The href Property is the Absolute URL
console.log(link.href); // http://127.0.0.1:8080/#
// With getAttribute it simply returns the URL as I wrote it in the HTML
console.log(link.getAttribute('href')); // #

//// DATA ATTRIBUTES
// Use them ALOT when working with the UI and when Storing Data in the UI (in the HTML code)
// Data Attributes are a special kind of attributes that start with the word DATA
// What is special about this, is that now this Attribute is at logo.dataset.versionNumber
// here I used camelCase in versionNumber, and in HTML I used the Dash '-' version-number (Just like Property Names, we need to transform this 'version-number' into camelCase)
// So for these Special Attributes, they are always stored in the Dataset Object
console.log(logo.dataset.versionNumber); // 3.0

//// CLASSES

// Just as we could read the Class name here 'console.log(logo.className);' with the className Property
// I could also use this to SET A CLASS
// DON'T USE THIS WAY (because this will OVERRIDE ALL THE EXISTING CLASSES) and also it allows us to only put ONE CLASS on any Element and it will OVERRIDE whatever is already there!
logo.className = 'Max';
console.log(logo.className);

// While there 4 Methods here make it really nice to work with the Classes
// By simply allowing us to ADD and REMOVE Classes based on their names, without interfering with the Classes that are ALREADY THERE

// I can also add MULTIPLE Classes by passing in MULTIPLE Values
logo.classList.add('a', 'e');
logo.classList.remove('b', 'f');
logo.classList.toggle('c');
logo.classList.contains('d'); // NOT .includes('d') like it is called in Arrays

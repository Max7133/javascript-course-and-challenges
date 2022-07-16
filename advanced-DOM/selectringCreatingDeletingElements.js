'use strict';

////////////////////////////////////////////   S E L E C T I N G   C R E A T I N G   D E L E T I N G   E L E M E N T S   ////////////////////////////////////////////

//// SELECTING ELEMENTS

// Selecting the ENTIRE DOCUMENT of any Webpage
// (Example: If we want to apply CSS styles to the ENTIRE PAGE we always need to select documentElement)
console.log(document.documentElement); // ENTIRE HTML
// Selecting HEAD
console.log(document.head);
// Selecting BODY
console.log(document.body);

// Will return the 1st Element that matches this Selector here ('.header')
const header = document.querySelector('.header');

// Selecting MULTIPLE Elements (also can call it on element.querySelectorAll)
const allSections = document.querySelectorAll('.section');
console.log(allSections); // NodeList(4) [section#section--1.section, section#section--2.section, section#section--3.section, section.section.section--sign-up]

// Passing the ID name itself
document.getElementById('section--1');

// Getting all the Elements with the Name of 'button'
// This Method returns a HTML collection (that's DIFFERENT from a Node list)
// HTMLCollection is a life collection, means if the DOM changes then this collection is also IMMEDIATELY UPDATED AUTOMATICALLY. (because we can also delete Elements from the DOM Programmatically not just Manually) (SAME DOES NOT HAPPEN WITH NODE LIST)
// Example: if I remove one Button in HTML in the browser by clicking INSPECT, and then go back to the Console, a try to read 'allButtons' again, it will show that I only have HTMLCollection(8) instead of HTMLCollection(9)
// Very IMPORTANT to keep in mind, when using getElementsByTagName Selector
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // HTMLCollection(9) [button.btn--text.btn--scroll-to, button.btn.operations__tab.operations__tab--1.operations__tab--active, button.btn.operations__tab.operations__tab--2, button.btn.operations__tab.operations__tab--3, button.slider__btn.slider__btn--left, button.slider__btn.slider__btn--right, button.btn.btn--show-modal, button.btn--close-modal, button.btn]
// If I do the same with Node list, (delete the button), and then run in the Console 'allSections',it will still show NodeList(4) because this 'allSections' Variable was created by the time that this Section still existed.
// And it didn't update itself as I deleted one of its Elements. (Very IMPORTANT to keep in mind)

// Similar to getElementById & getElementsByTagName
// Class name 'btn' and I don't need a Selector (it's not a '.btn' it's simply the name of the Classes 'btn')
// Also returns a life HTMLCollection
console.log(document.getElementsByClassName('btn')); // HTMLCollection(5) [button.btn.operations__tab.operations__tab--1.operations__tab--active, button.btn.operations__tab.operations__tab--2, button.btn.operations__tab.operations__tab--3, button.btn.btn--show-modal, button.btn]

//// CREATING AND INSERTING ELEMENTS

// We can create HTML Elements using the INSERT ADJACENT HTML FUNCTION
// .insertAdjacentHTML
// This is a quick and easy way of creating Elements

// Passing the String of the TAG Name 'div', this will Return a DOM Element that I can then save somewhere.
// This Element is not yet anywhere in our DOM, all this is is a DOM Object that I can now use to do something on it but it is not yet in the DOM itself. (It's nowhere to be found on the Webpage here)
// If I want it on the page, than I need to MANUALLY INSERT it into the page.
const message = document.createElement('div');
// Adding Classes
// Now this is like any other Selection that we have
// If we have an Element in our DOM and select it for Example .QUERYSELECTOR, then the Result is also a DOM Object that we can use in our code.
// 'message' now is JUST THE SAME, it's just an Object that represents a DOM Element, so we can use message.classList on it
message.classList.add('cookie-message'); // here I will build an Element which will display a small 'cookie message' on the bottom of the screen
// Adding TEXT into the Element with 'textContent'
message.textContent =
  'We use cookies for improved functionality and analytics.';
// Inserting HTML
// I can use both of these properties 'textContent' & 'innerHTML' to READ and to SET CONTENT
// Writing a String of HTML and adding a Button
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; // <-- So this will just display a nicely formatted Button saying Got It!

// Now I have this Element, now I'm goint to Insert it into our DOM
// Going to do it in the 'header', select it and then PREPEND the message to that Element
//header.prepend(message); // the 'header' will appear on the TOP of the Website (and in the DOM)
// Prepending adds the Element as the 1st Child of 'header' Element

// I can also add it as the LAST Child and that is APPEND
header.append(message); // the 'header' will appear on the BOTTOM of the Website (and in the DOM)
// What we see here is that the Element was actually only INSERTED ONCE
// That's because this Element 'message' is now indeed a life Element living in the DOM
// Therefore IT CAN'T be at multiple places at the same time.

// What happened here is that I FIRST PREPENDED the 'header' Element and then I APPENDED IT
// What this APPEND did here was to basically moved the Element from being the 1st Child to being the Last Child
// APPEND moved the Element, NOT inserted it, because it was already inserted by PREPEND
// Means we can use Append and Prepend Method not only to INSERT Elements but also to MOVE them.
// The DOM Element is UNIQUE, and can always ONLY exist at one place at a time.

// What if I wanted to insert MULTIPLE COPIES of the SAME Element
// I then would actually need to first COPY the 1st Element
// Then instead of appendidg the 'message' directly, I first CLONE IT with 'cloneNode()'
// And then I need to pass TRUE which means that - all the Child Elements will ALSO BE COPIED
//header.append(message.cloneNode(true)); // Now I have the SAME 'cookie-message' in BOTH PLACE, Top & Bottom of the Webpage

//// BEFORE METHOD
//header.before(message); // This will INSERT the 'message' BEFORE the 'header' Element
//// AFTER METHOD
//header.after(message); // This will INSERT the 'message' AFTER  the 'header' Element

//// DELETE ELEMENTS
// It will REMOVE 'message' Element after I click the Button
// With Class '.btn--close-cookie'
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // I don't need to select the 'message' Element again, because we already have it in Memory. (I already have it stored in a Variable)
    // OLD WAY
    //message.parentElement.removeChild(message);
  });

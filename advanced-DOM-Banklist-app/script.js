'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to'); // the Button
// # means ID
const section1 = document.querySelector('#section--1'); // will scroll to this section 1

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// btnsOpenModal - Node list because it's the result of querySelectorAll
// Node list is NOT an Array, but it still does have default forEach Method
// Node list dosen't have most of the Methods that Arrays have
// New forEach Method way
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// Old for Loop way
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////
//// Button Scrolling
// Adding an Event Listener to the Button
btnScrollTo.addEventListener('click', function (e) {
  // Getting the coordinetes of the Element where I want to scroll to with .getBoundingClientRect()
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords); // will get the X, Y, top, bottom, left, right position of the Button that I clicked
  // Getting rectangle for the Button, // e.target is btnScrollTo Element
  console.log(e.target.getBoundingClientRect());
  // Getting the Current Scroll Position
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // Reading the Height and the Width of this View Port. [Rectangle (Window Size) where we can see the current portion of the page]
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight, // clientHeight & clientWidth are dimensions of the View Port
    document.documentElement.clientWidth
  );

  // SMOOTH SCROLLING (NEW WAY)
  // I take the Element where I want to scroll to 'section1', and on that I call .scrollIntView()
  // And then I pass an Object and specify the Behavior and set it to Smooth.
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////////////////////
////// Page Navigation

//// Bad solution
//// Without using Event Delegation (Works fine, but it's NOT really efficient)
//// Because we are adding here the Exact Same Callback Function ONCE to EACH of these 3 Elements (it's fine for 3 Elements, but what if there were more than 10000 Elements?)
//// Then we would effectively be creating 10000 copies if this same function here bellow function (e) {...}. Which will certainly impact the Performance.
// Selecting 3 links from the Navigation Bar
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); // so it won't scroll into different part of the page, after clicking the link (because of the Anchors that I set in the HTML href="section--1", section--2, section--3)
//     // Anchors, so # and then some name, will Automatically move the Page to the Element which has the ID like id="section--2"
//     // Getting the 'href' where the Anchor ID
//     const id = this.getAttribute('href');
//     console.log(id); // #section--1 (After clicking the 1st Link), #section--2 (After clicking the 2nd Link) and so on..
//     // #section--1 Looks pretty much lika a Selector already, so I can now take it, and select an Element, based on this, and then scroll to that Element.
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// }); // Returns a Node List that I can use it forEach Method. in order to attach en Event Handler to EACH of the Elements in the Node List

//// Better solution
//// Using Events Delegation
//// In Event Delegation, we use the fact that Events Bubble Up, and we do that by putting the EventListener on a common parent of all the Elements that we are intrested in.
// In this Example is the Contrainer that's around all of these Links 'nav__links'
// So I will put the Event HAndler on this Element 'nav__links', and then when a user clicks one of the links, the Event is generated, and Bubbles Up
// And then I can catch that Event in this common Parent Element 'nav__links', and handle it there.

// In Event Delegation, we need 2 STEPS
// 1st we add the Event Listener to a common Parent Element of all the Elements that we're intrested in.
// 2nd In that Event Listener, determine what Element originated the Event, so that we can then work with that Element where the Event was actually created.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Where the Event actually happend, solution: e.target
  // console.log(e.target);

  // Matching Strategy
  // I check if the target Element contains the Class that I instrested in
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); // 'href' Attribute is on the Element that was clicked 'e.target'
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
  // Event Delegation is much BETTER, and more EFFICIENT, then attaching the Same Event Handler to multiple Elements.
  // Instead, I edit one big Event Handler Function to the Parent Element of all the Elements that I intrested in, and then I determined where the Click Event came from.
  // And then I needed MATCHING STRATEGY, because I wanted to IGNORE CLICKS that DID NOT HAPPEN right on one of the LINKS.
});

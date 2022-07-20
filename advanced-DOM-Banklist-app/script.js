'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to'); // the Button
// # means ID
const section1 = document.querySelector('#section--1'); // will scroll to this section 1
const nav = document.querySelector('.nav');
// Selecting the Tabs
const tabs = document.querySelectorAll('.operations__tab');
// Selecting the Tabs Container
const tabsContainer = document.querySelector('.operations__tab-container');
// Selecting 3 Contant Areas
const tabsContent = document.querySelectorAll('.operations__content');

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

/////////////////////////////////////////////////////////
////// Tabbed component

// BAD PRACTISE WAY (What if I had 200 Tabs ? Then I would have 200 copies of THIS EXACT Callback Function here, in result will Slow Down the Web Page)
//tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

// PROPER WAY (With Event Delegation)
// For Event Delegation, I need to attach the Event Handler on the Common Parent Element of all the Elements that I'm intrested in. (this case Tabs Container)
tabsContainer.addEventListener('click', function (e) {
  // Matching Strategy
  // Figuring our which Button was clicked
  // e.target will find the Button Element after the Click, but if I Click on the Number on the Button, it will show the Target of the SPAN Element, that I don't need
  // to FIX it, I need to add .parentElement, I can then move UP the DOM Tree, so whenever I click it will give me the Button, that's because that is the Parent Element
  //const clicked = e.target.parentElement; // FIX with Dom Traversing (because that's the Parent Element of that <span></span> )
  //console.log(clicked); // <button class="btn operations__tab operations__tab--2" data-tab="2">...</button>
  // BUT NOW, when I Click on the Button itself, I get, I will get the Parent of the Button Element, which is the Container, and that is something I don't want
  // PROPER FIX
  // What I want, is to get THE BUTTON, is NO MATTER if I Click on the SPAN, or on the Button itself, so I need a way of selecting the Parent Element that is ALWAYS A TAB.
  // to FIX This AGAIN, I need to use the Closest Method instead of the '.parentElement'
  // I want to go Upwards, but I want to specify that I want to select an Operations Tab, so the .closest() is for exactly that
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // FIX so I wont get NULL if I Click somewhere where there is gonna be No Parrent with this class ('.operations__tab) because of the closest()
  // Guard clause - IF Statement which will Return EARLY if some condition is matched
  // In this case if there is NOTHING Clicked than I want to immediately finish this Function (In this case, when I have NULL) which is Falsy and then !clicked NOT FALSY will become TRUE
  // and then the Function will Return, and none of the code that's after it will be executed.
  if (!clicked) return; // retuns immediatelly

  // Remove active Classes for Tab & Content Areas
  // in forEach it will remove the 'active' Class that lifts the Button Up when it's selected, therefore it will go down to it's default place
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // Removing the Active Class for all of them before adding it to the one that I'm intrested in
  tabsContent.forEach(con =>
    con.classList.remove('operations__content--active')
  );

  //// Activate Tab
  clicked.classList.add('operations__tab--active'); // will lift the Button Up

  //// Activate Content Area
  console.log(clicked.dataset.tab); // 2 if Button 2/3 clicked, 1 if Button 1/3 clicked
  // Every time I Click a Button, that Button is stored in the Clicked Variable
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`) // clicked.dataset.tab shows Number 1 or 2 or 3, depending on which button I clicked
    .classList.add('operations__content--active');
});

/////////////////////////////////////////////////////////
////// Menu fade animation
// 'mouseentter' Does Not Bubble
// 'mouseover' Bubble, the opposite is 'mouseout'
// I need the Event to Bubble so it can even reach the Navigation Element
const handleHover = function (e) {
  // Usually This Keyword === currentTarget, currentTarget will remain Unchanged
  // By default, This Keyword is the Same as the currentTarget (the Element on which the Event Listener is attached to)
  // But when we set the This Keyword MANUALLY, like I did here, it will become the Value what ever I set it to.
  console.log(this, e.currentTarget);
  // Matching the Element that I need, they are these  Elements with 'nav__link' Class on them
  if (e.target.classList.contains('nav__link')) {
    // not using closest(), becaouse there are no Child Elements, where I could accidentally Click in the Link
    const link = e.target;
    // selecting Sibling Elements (all other Links)
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); // I want all the Links
    const logo = link.closest('.nav').querySelector('img'); // this Selector is for Any Image with 'img' Tag
    // Changing the Opacity of the Siblings of the Selected Link
    siblings.forEach(el => {
      // Checking if the Current Element is NOT the Link itself (because 'siblings' contains Initial Link)
      if (el !== link) el.style.opacity = this; // = opacity // the This Keyword is now the 'opacity'
    });
    // Same for the Logo
    logo.style.opacity = this; // = opacity // the This Keyword is now the 'opacity'
  }
};
// nav.addEventListener('mouseover', function (e) {
//   // JS expects here a Function, not some other Regular Value, can't write handleHover(e, 0.5) here instead of function(){}
//   handleHover(e, 0.5); // Will work because I call the Function here Manually
// });
// Even BETTER way, with Bind Method
nav.addEventListener('mouseover', handleHover.bind(0.5));
// Bind Method creates a copy of the Function that it's called on,
// and it will set the This Keyword in this Function Call to any Value that I pass into Bind Method
// Passing "argument" into Handler (not really an Argument)
nav.addEventListener('mouseout', handleHover.bind(1)); // handleHover.bind() will also be a Function
// I used a Bind Method to pass an Argument into a Hangler Function
// It is impossible to pass another Argument into an eventHandler Function, they can only have 1 REAL Argument
// In this case "const handleHover = function (e) {}" they can only have 1 Real Parameter that is the EVENT
// If I want to pass addition Values into the Handler Function, then I need to use the This Keyword, like I did here
// And if I wanted multiple Values, then I would pass here "bind(Array, or an Object)" instead of just 1 Value

/////////////////////////////////////////////////////////
////// Sticky navigation

const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords); // Will get the Current Top Value of Section1 (Now, I can use it for Sticky Navigation)

// Scroll Event (is not efficient, and SHOULD be AVOIDED! It's BAD for Performance, it will fire up the Callback Function, each time we scroll)
window.addEventListener('scroll', function () {
  console.log(window.scrollY); // gets scroll position (from the point of the View Port to the very Top of the Page, that's why we get 0 at Start)
  // Using the TOP Value to add the Sticky Class for Navigation
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  // It will work, because at some point it will reach the position of the page, which is greater than the distance of the SECTION 1 from the top
  else nav.classList.remove('sticky');
}); // will work each time when we scroll tha page

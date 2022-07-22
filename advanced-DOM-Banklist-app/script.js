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

/* const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords); // Will get the Current Top Value of Section1 (Now, I can use it for Sticky Navigation)

// Scroll Event (is not efficient, and SHOULD be AVOIDED! It's BAD for Performance, it will fire up the Callback Function, each time we scroll)
window.addEventListener('scroll', function () {
  console.log(window.scrollY); // gets scroll position (from the point of the View Port to the very Top of the Page, that's why we get 0 at Start)
  // Using the TOP Value to add the Sticky Class for Navigation
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  // It will work, because at some point it will reach the position of the page, which is greater than the distance of the SECTION 1 from the top
  else nav.classList.remove('sticky');
}); // will work each time when we scroll tha page */

/////////////////////////////////////////////////////////
////// Intersection observer API

//// Trying Out The Intersection observer API
// Will be called each time that the Observed Element 'section1', is Intersecting with the 'root' Element at the 'threshold' that I defined.
// When all Conditions in 'observer & obsOptions' are met, 'obsCallback' will get called, no matter if I scroll Up or Down
// const obsCallback = function (enries, observer) {
//   // these 'entries' are an Array of the 'threshold entries' (in THIS CASE, there is only 1 Element there)
//   enries.forEach(entry => {
//     console.log(entry); // IntersectionObserverEntry {....}
//   });
// };

// const obsOptions = {
//   root: null, // is the Element that the Target is Intersecting, after setting it to NULL, it will be able to Observe the Target Element 'section1' intersecting the Entire Viewport [rectangle thtat show the Current Portion of the Webpage]
//   // threshold 10%
//   /*  threshold: 0.1, // is the % of Intersection at which the Observer Callback 'obsCallback' will be called, I set it to 10%,
//   // Example: it will be called if less or more than 10% of Target Element 'section1', are inside of the 'root'(Viewport) - is Visible */
//   // threshold Array
//   threshold: [0, 0.2], // 0% means that the Callback will trigger each time that the Target Element moves Completely Out of the View, and as soon as it Enters the View
//   // (because the Callback Function will be called when the 'threshold' is passed when moving INTO the View and OUT of the View)
// };
// // Passing the Callback Function to it, and an Object of options
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); // it will Observe the Target Element 'section1'

////// Using Intersection observer API on the Webpage
// Observing the 'header' Element

// Selecting Header
const header = document.querySelector('.header');
// Calculating the Height of the Navigation Bar DYNAMICALLY (because, it's Bad Practice to Hardcode the Value, as I did in the 'rootMargin')
const navHeight = nav.getBoundingClientRect().height; // Will get the Nav Bar Height
console.log(navHeight); // 90
const stickyNav = function (entries) {
  // no 2nd 'observer' Argument, because I don't need it here, there is only 1 'threshold' here and I don't need to Loop over the 'entries'
  // Using Destructuring to get the 1st Element of 'entries'
  const [entry] = entries; // gets first Element of 'entries'
  console.log(entry);
  // When the Header is NOT Intersecting the Viewport (root), then I add the Sticky Class
  // isIntersecting is a Property of the 'entry', it'd either TRUE or FALSE, depending how I set the 'threshold'
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky'); // When I scroll Up, that's where I remove this Sticky Class
};
// Creating Observer
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // root = null, because I'm interested in ENTIRE VIEWPORT in the browser window
  threshold: 0, // threshold = 0, because I'm interested in showing the Sticky Navigation as soon as the 'header' scrolls COMPLETELY OUT OF VIEW.
  //rootMargin: '-90px', // rootMargin = '-90px', is a box of 90px that will be applied outside the Target Element 'header' (and 90px is the Height of the Navigation Bar)
  rootMargin: `-${navHeight}px`, // This is the way to do it, because for Example if I have a Responsive Site
}); // so when 0% of the Header is Visible, then I want something to happen, that is to ADD and to REMOVE the Sticky Class, this I will define in 'stickyNav' Function
// Using headerObserver to observe the Header
headerObserver.observe(header);
// The Distance between the Start Section 1 and the Viewport is just the same as the Navigation Bar Height (this way the Navigation doesn't overlap the Section in the beginning)

/////////////////////////////////////////////////////////
////// Reveal Sections with Intersection observer API

// Selecting all Sections
const allSections = document.querySelectorAll('.section');

// Reveal Sections (can put in Any Name in the Arguments)
const revealSection = function (entries, observer) {
  // I need 'observer' Argument this time, because I will need to unobserve later
  const [entryTwo] = entries; // IntersectionObserverEntry {time: 175881.20000004768, rootBounds: DOMRectReadOnly, boundingClientRect: DOMRectReadOnly, intersectionRect: DOMRectReadOnly, isIntersecting: true, …}
  console.log(entryTwo); // I will find target:, inside it there is className: "section section--hidden", I will use it to make the Section VISIBLE

  // (This is a Fix, so the Section 1 won't shop up, right away)
  // If it isIntersecting then the Function will NOT return, and the rest of the Code, Will be Executed
  if (!entryTwo.isIntersecting) return; // Triggering .remove here, when the Section (target) is NOT intersecting, then Return right away

  // Using the 'target' I will know, which is the Section that actually intersected the Viewport
  entryTwo.target.classList.remove('section--hidden');
  observer.unobserve(entryTwo.target); // for stopping the Events of being added, because while I scroll, the 'observer' keeps Observing the Sections (they are no longer necessary)
};

// I want to Observe all 4 Sections
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // So it will show the Section a bit later after I scroll down (Section will be revealed when it's 15% visible)
});
// Looping over this Node List (allSections)
// we use forEach() when does not involve creating a New Array
// Callback Function parameter (section)
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden'); // will Hide all 'sections'
});

/////////////////////////////////////////////////////////
////// Lazy Loading Images (Blurred Effect) with Intersection observer API

// Selecting 3 Images (the ones that have data-src="img/digital.jpg" Attribute)
const imgTargets = document.querySelectorAll('img[data-src]');
//console.log(imgTargets); // NodeList(3) [img.features__img.lazy-img, img.features__img.lazy-img, img.features__img.lazy-img]

// Callback Function where the logic is
const loadImg = function (entries, observer) {
  const [entryThree] = entries;
  console.log(entryThree);

  if (!entryThree.isIntersecting) return;

  // Otherwise:
  // Replacing src Attribute with data-src (as it reaches the 'img' it will replace the placeholder Image)
  // That's the Element that's currently being Intersected
  // .dataset, is where the Special Data Properties are stored
  entryThree.target.src = entryThree.target.dataset.src; // entryThree.target.dataset.src where HD Image is
  // Replacing the 'src' Attribute is happening Behind The Scenes,
  // JS finds the New Image that it should load and display here and once it's finished loading that Image, it will EMIT the Load Event
  // Load Event is just like any other Event and we can just listen for it, and do something

  // Listening for the Load Event
  entryThree.target.addEventListener('load', function () {
    entryThree.target.classList.remove('lazy-img'); // Removing the Blurred Filter Class
  });
  observer.unobserve(entryThree.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // The Website should start loading these 4 Images, 200px before those 3 Images are loaded
  //(with this, there won't be any delay when we browse the page)
});
// Looping over the Targets
imgTargets.forEach(img => imgObserver.observe(img));

/////////////////////////////////////////////////////////
////// Slider

const slider = function () {
  // The 3 Slides are on Top of each other
  // 1st thing: Establishing this Initial condition where they are all side by side.
  // for that I'm setting Transform Properties to % (automatically)

  // Selecting Slider
  const slides = document.querySelectorAll('.slide');
  // Slider Buttons
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  // Dot Container
  const dotContainer = document.querySelector('.dots');

  // Current Visible Slide
  let curSlide = 0;
  // Max Slide where Slider can go
  const maxSlide = slides.length; // The Length of Node List

  // Scalling down Slider (TEMPORALY)
  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible'; // so I will see other slides, when sliding images

  // Putting all the Slides, Side by Side
  // Looping through the Slides
  // slides.forEach(
  //   (sld, i) => (sld.style.transform = `translateX(${100 * i}%)`) // Setting the style on each of the Slides, in translateX() where I specify the Value
  // ); // 1st slide 0%, 2nd slide 100%, 3rd slide 200%, 4th slide 300%, that's because `translateX()` will MOVE THEM to position 100%. (the Width of each IMG is 100%)

  // Dot Container Function
  // Creating 1 Element for Each of the Slides, while looping over the them
  const createDots = function () {
    slides.forEach(function (_, i) {
      // Don't need the 'slide' Argument
      // Creating an HTML Element
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>` // the First button will get Index 0, then 2,3,4, so that in the Next Step I can read this Value for here, and move exactly to that Slide, once one of the Dots is Clicked.
      ); // 'beforeend' - adding it as the Last Child always
    });
  };

  // Current Selected Slide on the Dot Container Function
  // (slide) Arg, passing in the Current Slide
  const activateDot = function (slidxe) {
    // Selecting ALL of the Dots, each time I want to activate one,
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active')); // then I will Remove that Active Class,
    // then add it only on the one that I'm intrested in.
    document
      .querySelector(`.dots__dot[data-slide="${slidxe}"]`) // selecting based on the 'data-slide' Attribute (should have exactly the Value of ${slide})
      .classList.add('dots__dot--active'); // the Selected Dot I can add to the classList or the Active Class.
  };

  // Function where I pass the Number of the Slide, where I want to go to
  const goToSlide = function (slide) {
    slides.forEach(
      (sld, i) => (sld.style.transform = `translateX(${100 * (i - slide)}%)`) // Setting the style on each of the Slides, in translateX() where I specify the Value
    ); // Ex: Cur Sld = 1, 1st Slide = -100%, 2nd Slide = 0, 3rd Slide = 100, 4th Slide = 200, 1nd Iteration (0 - 1) * 100 = -100%, 2nd Iteration (1 - 1) * 100 = 0%, 3rd Iteration (2 - 1) * 100 = -100% (Active Slide Need to be 0%)
  }; /////////////////////////////////////////////////////////////////////////////////////////////// curInd = 0 s 1, //////////////////// curInd = 1 s 1 ////////////////// curInd = 2 s 1

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      // -1 because 'length' is 0 based
      curSlide = 0; // after reaches end, will return to 1st Slider
    } else {
      curSlide++; // adds the Slider
    }

    // slides.forEach(
    //   (sld, i) => (sld.style.transform = `translateX(${100 * (i - curSlide)}%)`) // Setting the style on each of the Slides, in translateX() where I specify the Value
    //
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Previous Slide
  const previousSlide = function () {
    // if 'curSlide' is 0, then the 'curSlide' needs to be = to 'nextSlide'
    if (curSlide === 0) {
      curSlide = maxSlide - 1; // 'maxSlide' is not 0 based, that's why -1
    } else {
      curSlide--; // The Cur Slide will be decreased
    }
    // Here I reuse the SAME Function I wrote before, and also with the 'curSlide'
    goToSlide(curSlide); // Functionality of moving the Slide is the SAME, all this will do is to Update the 'transform' Property in the goToSlide Function
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0); // When the Webpage loads, it will Automatically go to Slide 0
    createDots(); // should be BEFORE I activate the Dots
    activateDot(0); // when Reloading the Page, the Dot should be at Slide 0
  };
  init();

  //// Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);

  // Attaching Event Handler to the Keyboard Event
  document.addEventListener('keydown', function (e) {
    console.log(e); // IF HIT RIGHT, KeyboardEvent {isTrusted: true, key: 'ArrowRight', code: 'ArrowRight', location: 0, ctrlKey: false, …}
    if (e.key === 'ArrowLeft') previousSlide();
    else nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      //const slide = e.target.dataset.slide; // using Destructuring because this Value 'slide' at the beginning is exactly the same as 'slide' at the end
      const { slide } = e.target.dataset; // reading through an Object
      // Now I want to go to the Slide, that I just selected
      goToSlide(slide); // the Slide Number from the 'e.target.dataset'
      activateDot(slide);
    }
  });
};
slider();

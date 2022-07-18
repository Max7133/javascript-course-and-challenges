'use strict';

////////////////////////////////////////////   S M O O T H   S C R O L L I N G   ////////////////////////////////////////////

//// SMOOTH SCROLLING (OLD WAY)
const btnScrollTo = document.querySelector('.btn--scroll-to'); // the Button
// # means ID
const section1 = document.querySelector('#section--1'); // will scroll to this section 1

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

  ////// S C R O L L I N G
  // scrollTo() is a Global Function that's available on the Window Object
  // 1st argument = left position, 2nd argument = top position
  //window.scrollTo(s1coords.left, s1coords.top); // will Scroll to the top of section 1
  // left value was: 0, top: 661.1478881835938 (top is ALWAYS RELATIVE TO THE VIEW PORT, BUT NOT TO THE DOCUMENT - not to the TOP of the page)
  // To FIX this, I need to add the Current Scroll Position to the Top Value here,
  // with this we will then determine the position of this Section here not relative to the viewport (to the top of browser Window), but instead to the Top of the PAGE

  // OLD WAY + FIX (the Current Position + the Current Scroll)
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // OLD WAY + FIX + SMOOTH ANIMATION (Making Smooth Animation)
  // This works by passing in an Object instead of just 1 Argument
  // Properties I need to specify are LEFT & TOP & BEGAVIOR
  // (For Implementing Smooth Scrolling I need to specify an Object with the Left, Top, Behavior Properties)
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //// SMOOTH SCROLLING (NEW WAY)
  // I take the Element where I want to scroll to 'section1', and on that I call .scrollIntView()
  // And then I pass an Object and specify the Behavior and set it to Smooth.
  section1.scrollIntoView({ behavior: 'smooth' });
});

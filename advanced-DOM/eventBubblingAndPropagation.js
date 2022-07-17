'use strict';

////////////////////////////////////////////   E V E N T   B U B B L I N G   &   P R O P A G A T I O N   ////////////////////////////////////////////

// Creating random color after the Click
// rgb(255, 255, 255);
// Random Integer
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
// Random Color
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor(0, 255));

// Attaching an Event Handler to 'Features' Link, and then to the Parent Elements as well
document.querySelector('.nav__link').addEventListener('click', function (e) {
  // In an Event Handler the THIS Keyword, points ALWAYS to the Element on which that Event Handler is attached.
  // In this case it's going to be this link: document.querySelector('.nav__link').
  this.style.backgroundColor = randomColor(); // Clicking this, will change the LINK color to their own random color
  console.log('LINK', e.target, e.currentTarget); // Target is where the Event first happened. (This is NOT the Element on which the Handler is actually attached!)

  // Stop propagation
  // e.stopPropagation()
});
// THE REASON FOR THIS is that the Event is happening at the the Document Root (from the Top of The Document),
// and from there it then TRAVELS DOWN to the Target Element, in this case that is this Link
// And then from there, it BUBBLES UP. Bubbling up means that basically it's as if the Event had also happened in all of the Parent Elements.
// And so that is the reason why this exact Event is now also being handled by this Event Listener BELLOW. that is on 'nav_links'
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // If I only click this '.nav__links', it will change random color, only for '.nav__links' the '.nav__link' will KEEP it's own random color, as it was before.
  // That's because THIS '.nav__links' is the PARENT Element of the '.nav__link'
  // And so from here, the Event ONLY bubbles up to its Parent Elements
  this.style.backgroundColor = randomColor(); // Clicking this, will change the LINKS CONTAINER and LINK color to their own random color
  console.log('CONTAINER', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    // If I click HERE, then the Click Event that happened HERE was indeed handled in ALL THREE PLACES '.nav_link', '.nav__linkS', '.nav'
    this.style.backgroundColor = randomColor(); // Clicking this, will change the NAV BAR, LINKS CONTAINER and LINK color to their own random color
    console.log('NAV', e.target, e.currentTarget);
    console.log(e.currentTarget === this); // Clicking this, I will get TRUE
    // So the THIS Keyword and the e.currentTarger are gonna be EXACTLY the same in ANY Event Handler
  }
  // true
  // In this case where this used Capture Parameter is set to TRUE, the Event Handler will NO LONGER LISTEN TO BUBBLING EVENTS, but instead, TO CAPTURING EVENTS.
  // In console.log it will look the same, BUT NOW the 1st Element through which the Event Passes is the NAV (NOT LINK)
  // The reason for that is that THIS Element is no actually listening for the Event as it travels DOWN from the DOM,
  // While the other 2 ones are listening for the Event, as it travels back UP. And so that's happens later, and therefore, the NAV is not the 1st one to shop up (because this, is the 1st one to happen.)
  // First Event travels DOWN all the way to the Target, and only then, it Bubbles back UP.
  // And so these other 2 Event Handlers here, they are looking for Bubbling Events, therefore, they gonna happen AFTER the First One.
  // They 3 are still working with the SAME EVENT, they're simply doing it in different phases of the Event Propagation.
);

//// Event Bubbling
// After adding, console.log('LINK', e.target); in ALL 3 places, after I clicked the link in '.nav_link', all the 3 Elements got a random background color.
// And after checking all 3 console.logs, we can see that the Target "nav__link", is ALWAYS THE SAME IN ALL 3 PLACES
// In all 3 Handlers, the Target Element will ALWAYS be the same. Thats the Element where the CLICK first happened.
// It appears in all 3 Handlers, because ALL OF THEM are essentially handling the Exact Same Event.
// This Event -> (e) that EACH of them receives, is the Exact Same Event. (That is because of EVENT BUBBLING).
// Event Bubbling, the Event originates in the LINK '.nav__link', but then it Bubbles UP to its Parent Element '.nav_links' and from there to its Next Parent Element '.nav'
// And even from there, it will travel UP in the DOM Tree. And so we can then handle that Event in ALL of the Parent Elements, and thats is exactly what I did here.

//// currentTarget
// Besides the '.target', there's is also the '.currentTarget'.
// The currentTarget is indeed the Element on which the EventHandler is attached.
// After I click on the LINK, I will see the currentTarget in the console.log, and it's NOT the same,
// in the LINK its the same '.nav__link', BECAUSE that's where the Event Happened, and it's also where the Handler is attached to. But in other 2 places it's different, in '.nav__links' & '.nav'

//// This Keyword
// the currentTarget HERE is EXACTLY THE SAME as the THIS Keyword
// The THIS Keyword is Also the one pointing to the Element on which the EventListener is attached to. Example: this.style.backgroundColor = randomColor();
//console.log(e.currentTarget === this);

//// Propagation
// We can actually STOP the Event Propagation
// We need to simply call on the Event, stopPropagation()
// After that when I click the LINK '.nav__link', the OTHER 2 Parrent Element Did NOT Changed their background colors
// Which means that the Event NEVER arrived at those Elements (In practice, is NOT a good idea)
// Stopping the Event Propagation like this can sometimes Fix problems in very complex applications with Many Handlers for the same Events
// In general, it's not really a good idea to STOP the Propagation of Events.

//// The Capture Phase (Phase 1)
// Events are Captured when they come DOWN from the Document Rout all the way to the Target
// The Event Handler that I WROTE HERE, are not picking up these Events during the Capture Phase.
// .addEventListener() is ONLY listening for Events in the Bubbling Phase, but NOT in the Capturing Phase. That's is the Default behavior of the .addEventListener() Method.
// The reason for that is that the Capturing Phase is usually IRRELEVANT For Us. (It's NOT that useful)
// However the Bubbling Phase can be very useful for something called Event Delegation.
// However, if we really do WANT to Catch Events during the Capturing Phase, we can define a 3rd Parameter in the .addEventListener Function.
// We can set the 3rd Parameter to TRUE or FALSE (by DEFAULT it's FALSE, but when not writting ANYTHING in the 3rd Argument, it's the same as writing FALSE) so usually it's left EMPTY.
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true
// );

'use strict';

////////////////////////////////////////////   T Y P E S   O F   E V E N T S   A N D   E V E N T   H A N D L E R S   ////////////////////////////////////////////

// Event - is basically a Signal that is generated by a certain DOM Node, and a Signal means that something has happened,
// For Example: A Click somewhere or Mouse moving, or user triggering to Full Screen Mode, anything that happens on the Webpage, generates an Event
// We can then listen for these Events in our code using EventListeners, so we can then handle them if we'd like.
// But no matter if we handle a certain event or not, for Example a Click, that Event will always happen when a user clicks.
// So, it doesn't matter if we're actually listening for it or not.

////// MOUSEENTER EVENT

// Selecting the Element 'h1'
const h1 = document.querySelector('h1');
// Now I can listen for this Event
// 'mouseenter' is a bit like the Hover Event in CSS, it fires whenever a mouse enters a certain Element
//// MODERN WAY
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading!'); // Alert will pop up when I hover over the Header on the Webpage
// });

//// Another way of attaching the EventListener to an Element
// By using the so-called onEvent Property directly on the Element
// Example: when we want to listen to 'mouseenter', there is a Property called 'onmouseenter', then we can simply set that Property to function (e) {alert('addEventListener: Great! You are reading the heading!');
//// OLD WAY
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading!'); // Alert will pop up when I hover over the Header on the Webpage
// };

//// 2 reasons why addEventListener is better.
// 1st: It allows us to add multiple EventListeners to the same Event
// We could write the WHOLE thing again: h1.addEventListener('mouseenter', function (e) {...}); AND SIMPLY CHANGE THE function(e) HERE
// If we did the same with 'onmouseenter' Property, the the 2nd Function would simply OVERRIDE the 1st one '.onmouseenter'
// 2nd: We can remove the EventHandler in case we don't need it anymore.
// To do that, first we need to Export the Function into a Named Function
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading!');
  // Removing Event
  h1.removeEventListener('mouseenter', alertH1); // The Event, Name Of the Function (This is why we need to Export the Function into its own Function 'alertH1')
};

h1.addEventListener('mouseenter', alertH1);
// Preventing Alert from happening.
// After we listened for an Event and handled the Event in the Function, we can REMOVE that EventListener.
// Result will be is that we can listen for the Event only once, after I close it, it will be REMOVED

// Removing Event after some time has passed. (after 10 seconds)
//setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 10000);

// 3rd Way of handling Events (Better NOT to use) OLD WAY
// which is by using an HTML attribute. <h1 onclick="alert('HTML alert, OLD SCHOOL WAY')"> // After I click on the Header, this Alert will appear.

'use strict';

////////////////////////////////////////////   L I F E C Y C L E   D O M   E V E N T S   ////////////////////////////////////////////

////// DOM Content Loaded Event
//// This Event is fired by the Document as soon as the HTML is completely Parsed (the HTML has benn Downloaded, and been Converted to the DOM Tree)
//// Also, all script must be downloaded and executed before the DOM Content Loaded Event can happen!
// We can listen to that Event, since it happens on the Document...
// This event does NOT wait for Images and Other external resources to load. (Just HTML & JavaScript need to be loaded.)
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// The Script Tag is at the End of the HTML, so we DO NOT NEED to Listen for the DOM Content to be loaded Event.
// So the Script, is the LAST THING that is going to be read in the HTML

////// The LOAD Event
//// This Event is fired by the Window, as asson as not only the HTML is parsed, but also ALL the Images and External Resources like CSS files are also loaded.
//// So when the Complete Page has finished loading is when this Event gets fired.
// We can listen to that Event
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

////// The Before UNLOAD Event (Don't overuse this, ONLY when EXTREMELLY NECESSARY)
//// This Event is fired by the Window, and is created Immediately before a user is about to leave the Page.
//// For Example: after clicking close Button on the Browser Tab
// We can use this Event to ask users if they 100% sure, that they want to Leave the Page.
window.addEventListener('beforeunload', function (e) {
  e.preventDefault(); // We add this, for some Browsers, to make this work (Chrome: Not Necessary, Some: Require It.)
  console.log(e);
  // For displaying a leaving confirmation, we need to set the Return Value on the Event to an EMPTY
  e.returnValue = '';
});

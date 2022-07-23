////////////////////////////////////////////   D E F E R   A N D   A S Y N C   ////////////////////////////////////////////

//// REGULAR script.js END OF BODY
// Scripts are fetched and executed After The HTML Is Completely Parsed.

// Use if you need to support old browsers.

//// ASYNC script.js IN HEAD
// Scripts are fetched Asynchronously and executed Immediately
// Usually the DOMContentLoaded event waits for ALL scripts to execute, except for async scripts.
// So, DOMContentLoaded does NOT wait for an async script.

// Scripts NOT guaranteed to execute in order!

// Use for 3rd-party scripts where order doesnt'matter (e.g. Google Analytics)

//// DEFER script.js IN HEAD
// Scripts are fetched Asynchronously and executed After The HTML Is Completely Parsed.

// DOMContentLoaded event fires After defer script is executed

// Scripts are executed In Order

// This is overall the BEST SOLUTION! Use for your own scripts, and when order matters (e.g. including a library).

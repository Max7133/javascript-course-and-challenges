'use strict';

// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'], // 19
  [36, '🔁 Substitution'], //11
  [47, '⚽️ GOAL'], // 14
  [61, '🔁 Substitution'], // 3
  [64, '🔶 Yellow card'], // 5
  [69, '🔴 Red card'], // 1
  [70, '🔁 Substitution'], // 2
  [72, '🔁 Substitution'], // 4
  [76, '⚽️ GOAL'], // 4
  [80, '⚽️ GOAL'], // 12
  [92, '🔶 Yellow card'],
]);

// 1. Create an array 'events' of the different game events that happened (no duplicates)
console.log(gameEvents); // Map(11) {17 => '⚽️ GOAL', 36 => '🔁 Substitution', 47 => '⚽️ GOAL', 61 => '🔁 Substitution', 64 => '🔶 Yellow card', …}
const events = [...new Set([...gameEvents.values()])];
console.log(events); // (4) ['⚽️ GOAL', '🔁 Substitution', '🔶 Yellow card', '🔴 Red card']

// 2. After the game has finished, it was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
gameEvents.delete(64);
console.log(gameEvents); // Map(10) {17 => '⚽️ GOAL', 36 => '🔁 Substitution', 47 => '⚽️ GOAL', 61 => '🔁 Substitution', 69 => '🔴 Red card', …}
console.log(gameEvents.has(64)); // false

// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// My version
const gameTime = 90;
const awg = [...new Set([...gameEvents.keys()])];
console.log(awg); // (10) [17, 36, 47, 61, 69, 70, 72, 76, 80, 92]
console.log(
  `An event happened, on average, every ${gameTime / awg.length} minutes`
); // An event happened, on average, every 9 minutes

// Teachers version
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
); // An event happened, on average, every 9 minutes

// 3.BONUS
// My version
// Converting map to an array
const awg2 = [...gameEvents.keys()];
const lastElement = awg2[awg2.length - 1];
console.log(lastElement / awg2.length); // 9.2

console.log(
  `An event happened, on average, every ${
    lastElement / gameEvents.size
  } minutes`
); // An event happened, on average, every 9.2 minutes

// Teachers version
const lastEl = [...gameEvents.keys()].pop();
console.log(lastEl); // 92

console.log(
  `An event happened, on average, every ${lastEl / gameEvents.size} minutes`
); // An event happened, on average, every 9.2 minutes

// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game,
// like this: [FIRST HALF] 17: ⚽️ GOAL

/* for (const [min, evnt] of gameEvents) {
  if (min <= 45) {
    console.log(`[FIRST HALF] ${min}: ${evnt}`);
  } else {
    console.log(`[SECOND HALF] ${min}: ${evnt}`);
  }
} */

// With ternary operator
for (const [min, evnt] of gameEvents)
  console.log(
    min <= 45 ? `[FIRST HALF] ${min}: ${evnt}` : `[SECOND HALF] ${min}: ${evnt}`
  ); // [FIRST HALF] 17: ⚽️ GOAL ETC... [SECOND HALF] 47: ⚽️ GOAL ETC...

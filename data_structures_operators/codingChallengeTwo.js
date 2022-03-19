'use strict';

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  scorers: {
    Gnarby: 1,
    Hummels: 1,
    Lewandowski: 2,
  },
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// I should print Lewandowski goal one etc...
const indexMy = [...game.scored]; // ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels']
console.log(indexMy); // (4) ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels']
for (const item of indexMy) console.log(item); // 4 FOOTBAL PLAYER NAMES
for (const [i, player] of indexMy.entries())
  console.log(`Goal ${i + 1}: ${player}`);

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// I SHOULD DIRRECTLY USE THE OBJECT ITSELF,
// SO DON'T DESTRUCT THE OBJECT FIRST INTO VARIABLES AND THEN USE THAT TO CALCULATE THE AVERAGE
// INSTEAD REALLY CALCULATE THE AVERAGE OF THE ELEMENTS IN THE OBJECT

// a + b + c / 3

let avg = 0;
const odds = Object.values(game.odds);
for (const odd of odds) {
  avg += odd;
}
console.log(avg);
avg /= odds.length;
console.log(avg);

/* 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉 */
// I'M NOT ALLOWED TO HARDCODE THE NAMES OF THE TEAMS
// INSTEAD GET THEM DIRRECTLY FROM THE GAME OBJECT ITSELF (EXCEPT FOR 'DRAW') THAT'S NOWHERE IN THE GAME OBJECT

const oddsTwo = Object.entries(game.odds);

for (const [team, score] of oddsTwo) {
  // console.log(`Odd of ${team}: ${score}`);
  const answer = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${answer}: ${score}`);
}
/* 4. BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      } */
console.log(game.scorers);

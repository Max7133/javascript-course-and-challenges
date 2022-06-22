///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// My Solution
const calcAverageHumanAgeTwo = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    // This is now the ONLY WAY to calculate the Average now
    // Dividing the 'age' by the Length of the current Array, immediately here in Each of the Iteration
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
const avg1 = calcAverageHumanAgeTwo([5, 2, 4, 1, 15, 8, 3]); // 44
const avg2 = calcAverageHumanAgeTwo([16, 6, 10, 5, 6, 1, 4]); // 47.333333333333336
console.log(avg1, avg2);

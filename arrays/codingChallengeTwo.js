'use strict';

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// MY SOLUTION
/* const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAge); // (7) [36, 4, 32, 2, 76, 48, 28]
  const atleast18 = humanAge.filter(age => age >= 18);
  console.log(atleast18); // (5) [36, 32, 76, 48, 28]
  const average =
    atleast18.reduce((acc, age) => acc + age, 0) / atleast18.length;
  console.log(average);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]); // 44
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]); // 47.333333333333336 */

// TEACHERS SOLUTION
// This Array takes an Array of Dog Ages
const calcAverageHumanAge = function (ages) {
  // Then I will convert all 'ages' to human ages (Creating a New Array based on the Original Array)
  // This will be the result of calling the Map Method on the 'ages' Array, this Callback Function gets access to the current age (Current Element in the Array)
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  // Filtering all Dogs Ages that are ATLEAST 18Y Old
  const adults = humanAges.filter(age => age >= 18);
  console.log(adults);
  // Calculating the average
  // This will Return the SUM, after I divide it by the Length of the Array
  // 1st Example of calculating Average
  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  // 2nf Example of calculating Average
  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

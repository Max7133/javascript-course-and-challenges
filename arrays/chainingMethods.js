'use strict';

//////////////////////////////////////////////////////   C H A I N I N G    M E T H O D S   //////////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Taking all 'movements' (deposits) then converting them from EUR to USD and add them all up,
// so Ill know exactly how much was deposited into the account in USD

// converting EUR to US
const eurToUsd = 1.1;

const totalDepositsUSD = movements
  // return only Positive Values
  .filter(mov => mov > 0)
  // current element * 1.1
  .map((mov, i, arr) => {
    // This is just to show that we can Inspect the Current Array at any stage of the Pipeline, using the 3rd Parameter 'arr' of the Callback Function
    // console.log(arr); // (5) [200, 450, 3000, 70, 1300] 5 TIMES
    return mov * eurToUsd;
  })
  // adds up all values together
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

// After reduce() I could Not have chained a Map Method or a Filter Method
// I can only chain a Method after another one, if the First one returns an Array
console.log(totalDepositsUSD); // 5522.000000000001

'use strict';

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`); // Something went wrong !!! Country not found (400). Try again!
    return response.json();
  });
};

///////////////////////////////////////   R U N N I N G   P R O M I S E S   I N   P A R A L L E L    ///////////////////////////////////////

// This Function will take in 3 Countries and it will lock the Capital Cities of these 3 counries as an Array
const get3Countries = async function (c1, c2, c3) {
  // In Async Function, always have to wrap the code with Try...Catch
  try {
    // Creating 3 Variables for 3 countries
    // Using destructuring because the result, will be an Array with one Object
    //// HOW NOT TO DO IT
    //const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    //const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    //const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // Getting the capital (there is a Capital property in the API)
    //console.log([data1.capital, data2.capital, data3.capital]); // returning an Array

    // Running all 3 Promises in Paralel (at the same time)
    // IMPORTANT TO KNOW: If one of the Promises Rejects, then the Whole Promise.all Rejects as well (Promise.all Short Circuits)
    // With Promise.all Combinator Function (all() is like a Helper Function on this Promise Constructor, so it's a Static Method)
    // This Function here takes in an Array of Promises, and it will Return a New Promise, which will then run All the Promises in the Array at the same time.
    const data = await Promise.all([
      await getJSON(`https://restcountries.com/v2/name/${c1}`),
      await getJSON(`https://restcountries.com/v2/name/${c2}`),
      await getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    // For getting the same Output as before, all I need to do is to loop over this 'data', and take out the 'data' that I want
    console.log(data.map(el => el[0].capital)); // (3) ['Tallinn', 'Helsinki', 'Stockholm']
  } catch (err) {
    console.log(err);
  }
};

get3Countries('estonia', 'finland', 'sweden'); // (3) ['Tallinn', 'Helsinki', 'Stockholm']

////// Whenever there is a situation in which I need to do multiple Asynchronous Operations at the same time and Operations that don't depend on one another,
////// then I should always, always run them in Parallel, just like I did here with Promise.all
////// Even if not using Async Await, I can also take this 3 Promises and then handle it with the then(), that's gonna work just exactly the same as with Async Await.
////// It's called a Combinator Function because it allows us to combine multiple Promises.

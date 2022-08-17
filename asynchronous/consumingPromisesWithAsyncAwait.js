'use strict';

const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `        
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
         <h3 class="country__name">${data.name}</h3>
         <h4 class="country__region">${data.region}</h4>
         <p class="country__row"><span>👫</span>${(
           +data.population / 1000000
         ).toFixed(1)}</p>
         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>`;

  // Inserting HTML
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////   C O N S U M I N G   P R O M I S E S   W I T H   A S Y N C   A W A I T    ///////////////////////////////////////
const getPosition = function () {
  // here I'm passingh in the Executor Function
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// This is now Asynchronous Function, that will keep running in the background while performing the Code that inside of it
// when the Function is done, then it automatially Returns a Promise
// Inside an Async Function, we can have 1 or MORE Await Statements
const whereAmI = async function () {
  //// Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  //// Reverse geocoding
  // Response
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGeo = await resGeo.json(); // this itself Returns a New Promise
  console.log(dataGeo);

  //// Country data
  // and here I need a Promise, I can use the Promise returned from the fetch()
  const res = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.country}`
  ); // the fetch() will return a Promise
  // and so in an Async Function like this one, I can use the Await Keyword to basically Await for the Result of this Promise.
  // Await will Stop decode execution at this Point of the Function, until the Promise is Fulfilled (until the Data is fetched in this case)

  // Getting the JSON out of this Response
  const data = await res.json(); // this itself Returns a New Promise (Previously I would have to Return this Promise, and then CHAIN another then())
  // Now I can just Await this, and then I can store the results directly into this 'data' Variable
  console.log(data);
  renderCountry(data[0]);
}; ////// Total in whereAmI I'm AWAITING for 5 PROMISES in a very easy way, in code that actually looks and feels like Synchronous Code

/////////////// UPPER EXAMPLE IS THE SAME AS THIS OLD VERSION
// fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res))
/////////////// ASYNC AWAIT IS IN FACT, SIMPLY SYNTACTIC SUGAR OVER THE 'THEN METHOD' IN 'PROMISES'
/////////////// BEHIND THE SCENES, WE ARE STILL USING PROMISES, BUT WITH A DIFFERENT WAY OF CONSUMING THEM HERE

////// THIS WON'T BLOCK THE EXECUTION IN THIS CASE, BECAUSE STOPPING EXECUTION IN AN ASYNC FUNCTION IS NOT A PROBLEM,
////// BECAUSE THIS FUNCTION IS RUNNING ASYNCHRONOUSLY IN THE BACKGROUND, THEREFORE IT IS NOT BLOCKING THE MAIN THREAT OF EXECUTION, SO IT'S NOT BLOCKING THE CALL STACK.

// EXECUTION ORDER:
// FIRST
// Response {type: 'cors', url: 'https://restcountries.com/v2/name/finland', redirected: false, status: 200, ok: true, …}

whereAmI();
console.log('FIRST');

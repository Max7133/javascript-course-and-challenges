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

// ERROR Function
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////   R E T U R N I N G   V A L U E S   F R O M   A S Y N C   F U N C T I O N S    ///////////////////////////////////////

const getPosition = function () {
  // here I'm passingh in the Executor Function
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //// Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    //// Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );

    // Manually creating an Error so then it will be caught in the Catch Block
    // const res = await fetch(
    //   `https://restcountries.com/v2/name/${dataGeo.countryyyyyyyy}` // Creating an Error
    // );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    // I want to Return a String based on the Geocoding Data
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    // Rendering the Error
    renderError(`${err.message}`);

    //// Reject Promise returned from Async
    // Now I'm taking the Error and Throwing it again
    throw err;
  }
};

console.log('1: Will get location');
// After Returning the String from 'dataGeo', now I want get that Data out here
// Pretending that this is simply a Regular Function
////const city = whereAmI();

// Will return a Promise because an Async Function always Returns a Promise
// Makes sence that here I get a Promise and not the Value that I wanted to get   return `You are in ${dataGeo.city}, ${dataGeo.country}`
// Reason is that at this point of the Code, JS has no way of knowing yet about that String that I want, because the Function is still running, but it is also Not Blocking the Code out here
// the Value that I return from an Async Function (that String) will become the Fulfilled Value of the Promise that is Returned by the Function
////console.log(city); // Will Return a Promise instead of the String that I returned, the Fulfilled Value of that Promise is going to be the String that I returned
// because that is the Value that I returned, from the Async Function (if there is no Error happening in this Function)

// Since I know that it will Return a Promise, I now also know how to get the Data that I want
// This will be a Promise, and on the Async Function I can use the then() to Get the Fulfilled Value of the Promise.
// So in the then(), the 'city' Argument that will be passed into the Callback Function is going to be the Result Value of the Promise. (that String) return `You are in ${dataGeo.city}, ${dataGeo.country}`

//// whereAmI()
////   .then(city => console.log(`2: ${city}`)) // You are in Tallinn, Estonia, // WHEN ERROR: undefined
////   .catch(err => console.error(`2: ${err.message}`))
////   .finally(() => console.log('3: Finished getting location'));

// When 'undefined' with Error, the console.log still worked, it's still running, which means that this Callback Function is still running, which means that the then() was called,
// which in turn means that this Promise here was actually Fulfilled and Not Rejected.
// even though there was an Error in the Async Function, the Promise that it Returns is still Fulfilled and Not Rejected.
// And in fact, I'm adding the Catch Handler here, but still, the console.log shows 'undefined' from the then() and from not catch()
// and that's why is that even though there was an Error in the Async Function, the Promise that it Returns is still Fulfilled.

// If I wanted to Fix that, so if I want to be able to catch that Error in the catch() as well, then I would have to RETHROW that Error, so that I can then propagate it down.
// and so with that, I will Manually Reject a Promise that's returned from the Async Function

// Fixing so that the 3: won't appear before 2: in console.log with finally() - it will ALWAYS gonna be executed

// Converting this to Async/Await as well, I can do that because, of course, I can treat the Promise here that is Returned just like any other Promise
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

// Converting to an async IIFE Function
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  // This last part I put outside of the Try...Catch block, and so then it is always gonna be executed no matter what.
  console.log('3: Finished getting location');
})();

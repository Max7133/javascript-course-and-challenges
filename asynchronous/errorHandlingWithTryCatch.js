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

///////////////////////////////////////   E R R O R   H A N D L I N G   W I T H   T R Y   C A T C H    ///////////////////////////////////////

const getPosition = function () {
  // here I'm passingh in the Executor Function
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    //// Geolocation
    // For this 1st Promise here, I don't need to Throw an Error Manually,
    // because in the case that something goes wrong the Geolocation, I already built the Promise so that it automatically Rejects in that case.
    // in this case, I will then immediately get an Error, which will get caught in the Catch Block
    // Tha same is Not True for the Promise coming from Fetch, that Promise only gets Rejected when the User has No Internet Connection
    // in case of 403 or 404 Error the Fetch Promse does not Reject, that's why I did it Manually.
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //// Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    // Manually creating an Error so then it will be caught in the Catch Block
    // this If Block handles any Error in this Fetch
    // resGeo Response will have the 'ok' Property, and if that is not set to true, then Throw a New Error
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    //// Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    // Manually creating an Error so then it will be caught in the Catch Block
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
    // Rendering the Error
    renderError(`${err.message}`);
  }
};

whereAmI();
console.log('FIRST');

//// Simple Example of Try...Catch
// I can wrap all of the code in a Try Block, and JS will try to execute this Code
try {
  let y = 1;
  const x = 2;
  // x = 3; // making an Error by reassigning a Constant
  // this 'catch' block will have access to whatever Error occured here in the Try Block
} catch (err) {
  // any Error has the 'message' Property
  alert(err.message); // catched the Error here
}

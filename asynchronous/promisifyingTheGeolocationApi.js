'use strict';

///////////////////////////////////////   P R O M I S I F Y I N G   T H E   G E O L O C A T I O N   A P I   ///////////////////////////////////////

const getPosition = function () {
  // here I'm passingh in the Executor Function
  return new Promise(function (resolve, reject) {
    // 1st Callback for the success, 2nd for the Error
    // navigator.geolocation.getCurrentPosition(
    //   // I'm calling the Resolve Function and passing in the Position Object (this is the Fulfilled Value I want to get from this Promise)
    //   position => resolve(position),
    //   err => reject(err)
    // );

    // ALTERNATIVE BETTER WAY
    // (Before I specified the Callback manually like this position => resolve(position),)
    // But all I did was is to take the Position and passed it down into Resolve
    // but here, that now happens automatically, now Resolve itself is the Callback Function, which will get called with the Position
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// same thing like with the Fetch Function
getPosition().then(pos => console.log(pos)); // GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1660662792715}
// The Promise was marked as successful by the Resolve Function and so therefore then here this (pos => console.log(pos)) Callback was called in the then()
// the position was passed in and here I logged it to the Console

///////////////////////////// PROMISIFYING CODING CHALLENGE 1 ////////////////////////////////////

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// Special class for neighboring country (for Class "country") that I attach, so they would appear little bit smaller (className = '')
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
             <p class="country__row"><span>🗣️</span>${
               data.languages[0].name
             }</p>
             <p class="country__row"><span>💰</span>${
               data.currencies[0].name
             }</p>
            </div>
          </article>`;

  // Inserting HTML
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const whereAmI = function () {
  // getting the position
  getPosition()
    // chaining next Promise
    .then(pos => {
      // Destructuring the Object
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      console.log(res);
      if (!res.ok) throw new Error(`Problem with geocoding (${res.status})`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      // based on 'data.country' I have my next fetch() here, which I will then return.
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      console.log(res);
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
    })
    .catch(err => {
      console.log(err);
      renderError(`${err.message}`);
    });
};

btn.addEventListener('click', whereAmI);

'use strict';

///////////////////////////////////////   C H A I N I N G   P R O M I S E S   ///////////////////////////////////////

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
         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>`;

  // Inserting HTML
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// the Then() always returns a Promise, no matter if I actually return anything or not.
// but if we do return a value, then that Value will become the Fulfillment Value or the return Promise.

const getCountryData = function (country) {
  // First AJAX Call
  fetch(`https://restcountries.com/v2/name/${country}`) // this fetches the Data
    .then(response => response.json()) // I get the 'response' which will be transformed to JSON
    .then(data => {
      // Second AJAX Call needs to happen here (as soon as I get the Data from 1st country, then I need to get the neighbour country and do the AJAX Call for that one as well)
      renderCountry(data[0]); // and then I take this Data and Render the country to the DOM.
      const neighbour = data[0].borders?.[0];

      if (!neighbour) return;

      // Returning a New Promise, after I will be able to Chain a New then(), on the result of this then Method .then(data => {...
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    // Dealing with the upper Fulfilled Value of a fetch Promise
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};
getCountryData('finland');

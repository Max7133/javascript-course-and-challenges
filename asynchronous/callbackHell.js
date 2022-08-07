'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////   C A L L B A C K   H E L L   ///////////////////////////////////////

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

// this Function will take a String as an Input of a Country
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  // Callback Hell example 1
  request.addEventListener('load', function () {
    console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    // Using OPTIONAL CHAINING to account for countries with No borders Property
    const neighbour = data.borders?.[0];

    // If country doesn't have Neighbours
    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    //request.open('GET', `https://restcountries.com/v2/name/${country}`); // Searching by NAME
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`); // Searching by CODE
    request2.send();

    // Callback Function inside of a Callback Function [Nested Callbacks]
    //// Callback Hell is when we have a lot of Nested Callbacks in order to execute Asynchronous tasks in sequence,
    //// this happens for All Asynchronous tasks, which are handled by Callbacks, and Not just AJAX calls.
    // Listening for the 'load' Event on this new request
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText); // NO Destructuring line in [data] upper,
      // reason for that is that the Response of this API is no longer an Array, when I search for the Code this time and not for tha Name
      // the 'country' Codes are unique, so therefore, they can always just be 1 Result.
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('finland');

// Callback Hell example 2
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

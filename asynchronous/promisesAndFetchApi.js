'use strict';

///////////////////////////////////////   P R O M I S E S   A N D   T H E   F E T C H   A P I   ///////////////////////////////////////
// ES6 FEATURE

// Replacing the old XMLHttpRequest() Function with the Modern Way of making AJAX calls. (using the Fetch API)
// OLD WAY
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// MODERN WAY
// For GETTING the request
const request = fetch('https://restcountries.com/v2/name/finland');
console.log(request); // Promise {<pending>}

// PROMISE IS:
// PROMISE: An Object that is used as a placeholder for the future result of an asynchronous operation.
// PROMISE: A containter for an asynchronously delivered value.
// PROMISE: A container for a future value.

// By using PROMISES, we no longer need to rely on Events and Callbacks passed into Asynchronous Functions to handle Asynchronous results.
// By using PROMISES, we can Chain PROMISES for a sequence of Asynchronous Operations instead of Nesting (escaping Callback Hell)

///////////////////////////////////////   C O N S U M I N G   P R O M I S E S   ///////////////////////////////////////

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

// const getCountryData = function (country) {
//   // the Promise will be Fulfilled, and I have a Value to work with, for that I use the Then Method that is available on all Promises --> then().
//   // in the then() I need to pass a Callback Function, that I want to be executed, as soon as the Promise is actually Fulfilled.
//   // this Callback Function will receive 1 Argument once it's called, and that Argument is the resulting Value of the Fulfilled Promise. (response)
//   // I called it 'response' because this is the response of an AJAX call in this case.
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (
//       response // this is a Resolved Value
//     ) {
//       console.log(response); // Response {type: 'cors', url: 'https://restcountries.com/v2/name/finland', redirected: false, status: 200, ok: true, …}
//       // INSIDE THE Response: // there will be body: Property, and in order to be able to actually read the data from body: ReadableStream, I need to call the JSON Mehtod on the Response.
//       // For reading the data from response, I will call json() on the 'response' Object
//       return response.json(); // json() is available on all the Response Objects that is coming the fetch() (so all of the Resolved Values)
//       // json() also an Asynchronous Function (also returns a New Promise)
//     }) // All of this becomes a new Promise itself, so I'm calling the then() on this Promise
//     .then(function (data) {
//       // I get access to 'data', because the Resolved Value of this Promise here 'response.json()' is going to be the Data itself.
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Same, only Arrow Functions + no console.logs
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`) // this fetches the Data
    .then(response => response.json()) // I get the 'response' which will be transformed to JSON
    .then(data => renderCountry(data[0])); // and then I take this Data and Render the country to the DOM.
};
getCountryData('finland');

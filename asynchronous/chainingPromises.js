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
  //countriesContainer.style.opacity = 1;
};

// ERROR Function
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //countriesContainer.style.opacity = 1;
};

// the Then() always returns a Promise, no matter if I actually return anything or not.
// but if we do return a value, then that Value will become the Fulfillment Value or the return Promise.
// then() is only called while the Promise is Fulfilled
// catch() is only called while the Promise is Rejected
// finally() is called always for something that always needs to happen, no matter the result of the Promise

const getCountryData = function (country) {
  // First AJAX Call
  fetch(`https://restcountries.com/v2/name/${country}`) // this fetches the Data
    .then(
      response => response.json()
      // 2 ways of handling Rejections (for e.g. I lost internet connection)
      // 1st Way: By passing a 2nd Callback Function into the then()
      //, err => alert(err) // Will display Failed to Fetch, when tried to click a button on WebPage and internet connection lost
      // the Error that was previously is now gone, because I catched the Error here.
    ) // I get the 'response' which will be transformed to JSON

    .then(data => {
      // Second AJAX Call needs to happen here (as soon as I get the Data from 1st country, then I need to get the neighbour country and do the AJAX Call for that one as well)
      renderCountry(data[0]); // and then I take this Data and Render the country to the DOM.
      const neighbour = data[0].borders?.[0];

      if (!neighbour) return;

      // Returning a New Promise, after I will be able to Chain a New then(), on the result of this then Method .then(data => {...
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    // Dealing with the upper Fulfilled Value of a fetch Promise
    .then(
      response => response.json()
      //err => alert(err)
    )
    .then(data => renderCountry(data, 'neighbour'))
    // BETTER WAY OF HANDLING ERRORS
    // I can handle all the Errors no matter where they appear in the Chain, right at the END of the Chain by adding catch()
    // This ERROR that is generated here is a real JavaScript Object, it's possible to create Error in JavaScript with a Constructor Function, for e.g. just like a Map or a Set
    .catch(err => {
      // catch() also Returnes a Promise
      console.error(`${err} !!!`);
      renderError(`Something went wrong !!! ${err.message}. Try again!`); // Any Error in JS that was created like this contains the 'message' Property
    }) // .message, for printing only the 'message' of that Error on the web page, and not the Whole Object itself.
    // A Method that is also available on all Promises.
    // Finally Method
    // and then the Callback Function that I defined here will always be called whatever happens with the Promise.
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('finland');
});

getCountryData('nothing'); // with this 404 error, the Fetch Promise will still get Fulfilled (there is no rejection and so my Catch Handler cannot pick up on this ERROR)

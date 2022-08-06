'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////   A J A X   C A L L :   X M L H T T P R E Q U E S T   ///////////////////////////////////////

// this Function will take a String as an Input of a Country
const getCountryData = function (country) {
  //// 1st Old School way for AJAX Call (XML HTTP request Function)
  const request = new XMLHttpRequest();
  // Writing the URL to which I make the AJAX Call
  // Passing in the type of request
  // the type of HTTP request to GET Data is called GET
  // then I need a String containing the URL to which the AJAX Call should be made.
  request.open('GET', `https://restcountries.com/v2/name/${country}`); // with this, I opened the Request
  request.send(); // this will send off the Request to the URL, this Request then fetches the Data in the Background.
  // Once it's Done, it will emit the 'load' Event from below

  //// So if I tried to set it out here, then this wouldn't work. (I won't receive the Data)
  //console.log(request.responseText); // blank

  // Registering a Callback on the Request Object for the 'load' Event
  //// Using this eventListener I'm waiting for the 'load' event, as soon as the Data arrives, this Callback Function here will be called.
  request.addEventListener('load', function () {
    console.log(this.responseText); // the THIS Keyword inside of this Function is the 'request'
    // 'response' is in the Property responseText (This Property here only gonna be set once the Data has actually arrived)

    // Converting the JSON String to an actual JavaScript Object.
    const [data] = JSON.parse(this.responseText); // used Destructuring to get the Object immediately
    console.log(data);

    const html = `        
    <article class="country">
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
  });
};

// 2 AJAX Calls happening at the Same Time
// whatever one arrives first, will then fire the 'load' Event first, and so if the 1st one is to AJAX Call for the USA,
// then the 1st Element that's gonna be shown in the Browser will of course be the one from the USA
getCountryData('finland');
getCountryData('estonia');

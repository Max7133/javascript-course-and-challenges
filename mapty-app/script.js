'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//// Geolocation API
// This Function here takes as an input 2 Callback Functions
// 1st one is to Callback Function that will be called whenever the Browser successfully got the Coordinates of the Current Position of the User
// and it is called with a Parameter, which is called the Position Parameter. (can write ANY NAME that I want for it)
// 2nd one is the Error Callback, will be called when there happened an Error while getting the coordinates.

// Checking if navigator.geolocation exists (so I won't get any errors)
// if it exists
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // using Destructuring to get the 'latitude' & 'longitude'
      const { latitude } = position.coords; // this will create a Variable called 'latitude' based out of the 'latitude' Property of this Object
      const { longitude } = position.coords;
      //console.log(latitude, longitude); // 60.2217741 24.8258254 (with these Coordinates, I want to Load the Map and then Center that Map on this Position.)
      // creating a Link in Google Maps
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];
      console.log(coords);

      //// Dislplaying a Map using Leaflet Library

      // Whatever String I pass in L.map(), must be the ID Name of an Element in our HTML, and it is in that Element where the Map will be displayed.
      // the 'L' is the Main Function that Leaflet gives us as an Entry Point. (Leaflet basically gives us this 'L' Namespace, and that 'L' has couple of Methods that I can use.)
      // the 'L' Variable is the Global Variable that we can access from All the Other Scripts (it's now available in the 'script' and the Browser Console if i type there 'L')
      const map = L.map('map').setView(coords, 13); // 13 zoom level
      //console.log(map);

      // Added titeLayer
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map); // Added tileLayer to the 'map' using .addTo

      // 'on' Method comes from the Leaflet Library, and this 'map' Object here is an Object that was generated by Leaflet 'L', (therefore this is gonna be a Special Object, with a couple of Methods and Properties on it)
      // Adding the eventListener to the Map for handeling any incoming Clicks.
      map.on('click', function (mapEvent) {
        console.log(mapEvent);
        // Taking the Latitude & Longitude from this 'map' Object
        const { lat, lng } = mapEvent.latlng;
        // Putting the Marker exactly where user Clicks
        // L.marker creates the Marker
        // .addTo add the Marker to the 'map'
        // .bindPopup wll create a popup and Bind it to the Marker
        L.marker([lat, lng])
          .addTo(map)
          //.bindPopup('Workout') Instead of specifying a String
          // I will create a brand New Popup Object L.popup({...}), which will contain a couple of Options.
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false, // overriding the behavior of the Popup closing, when another Popup is opened.
              closeOnClick: false, // will prevent Popups from closing whenever the User Clicks on the Map.
              className: 'running-popup', // for customizing Popup (using this one to Assign Any CSS Class Name that I want to the Popup)
            })
          )
          // these 2 Methods always Returned THIS Keyword (the Current Object), therefore they can be CHAINABLE
          .setPopupContent('Workout')
          .openPopup();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );

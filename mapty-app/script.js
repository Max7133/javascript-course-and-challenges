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

class Workout {
  // Creating date = and id = like this, is something New in JavaScript that has not been implemented to the language yet
  // Date where the Object is created (the date in which the Workout happened)
  date = new Date();
  // ID (Unique Identifier)
  // Creating ID using Date.now that shows the Current Time Stamp of right now, then convert that to a String and then take the last 10 Numbers.
  id = (Date.now() + '').slice(-10);
  // Will take in the Data that is common to both 'workouts'
  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

// I won't directly create a 'workout'
// Instead I will always either create a Running or a Cycling Object (Child Classes)
class Running extends Workout {
  // will take same Data as Parent Class 'Workout' + additional Properties on a Running Object
  constructor(coords, distance, duration, cadence) {
    // calling the Super Class with Arguments that are also in the Parent Class, and this will initialize the THIS Keyword
    super(coords, distance, duration);
    this.cadence = cadence;
    // it's fine to Call Any Code in a Constructor (did the same in the App Class for Other Methods)
    this.calcPace();
  }
  // Method for Calculating the Phase is defined in Minutes per Kilometer
  calcPace() {
    // adding New 'pace' Property = minutes / kilometers (the Distance)
    this.pace = this.duration / this.distance;
    return this.pace; // returning this Data, in case someplace in the Code ill need it
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    // calling the Super Class with Arguments that are also in the Parent Class, and this will initialize the THIS Keyword
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }
  // Method for Calculating the Speed is measured in Kilometers per Hour (opposite of the 'pace')
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60); // duration is in Hours that's why I divide it by 60
    return this.speed;
  }
}
//let map, mapEvent; // Global Variable, so I can access it in the Marker Creation

// FOR TESTING the Running & Cycling Class
// Passing in Array of Coordinates Latitude 39, Longitude -12, Distance 5.2 km, Minutes 24, Steps per Minute 178
// const run1 = new Running([39, -12], 5.2, 24, 178);
// Passing in Array of Coordinates Latitude 39, Longitude -12, Distance 27 km, Minutes 95, Elevation Gain 523 Meters
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

///////////////////////////////////////////////
//// APPLICATION ARCHITECTURE
class App {
  // I'm gonna Define the 'map' & 'mapEvent' as Properties of the Object, using Private Classes
  #map; // both of them will now become Private Instance Properties
  #mapEvent; // Properties that are gonna be present on All the Instances created through this Class

  // this 'constructor' Method is called Immediately when a New Object is created from this Class
  // and that Object that is created 'const app = new App()' is created right in the beginning when the Page Loads,
  // and so that means that the Constructor Method is also executed Immediately as the Page loads.
  // that's why I putted 'this._getPosition()' in the Constructor
  constructor() {
    // for Triggering the Geolocation API
    this._getPosition();

    // Adding eventHandler for the 'form' for submitting it with 'Enter' key, after it is submitted, that Marker then appears on the Page (where I clicked)
    form.addEventListener('submit', this._newWorkout.bind(this)); // I had to Bind because, originally the THIS Keyword will point to 'form'
    // but that's not what I want, in Most of these Methods, I want the THIS Keyword to Still Point to the Object Itself in this case The App Object

    ///// WORKING WITH EVENT HANDLERS IN CLASSES LIKE HERE, WHEN EVENT LISTENERS INSIDE OF A CLASS, U WILL BE BINDING THE THIS KEYWORDS ALL THE TIME!

    // Listening for the 'change' Event (when selecting 'cycling' and 'running' will 'change' Cadence)
    inputType.addEventListener('change', this._toggleElevationField);
  }

  //// 1/2 The Current Position should be determined here in this Method

  _getPosition() {
    //// Geolocation API
    // This Function here takes as an input 2 Callback Functions
    // 1st one is to Callback Function that will be called whenever the Browser successfully got the Coordinates of the Current Position of the User
    // and it is called with a Parameter, which is called the Position Parameter. (can write ANY NAME that I want for it)
    // 2nd one is the Error Callback, will be called when there happened an Error while getting the coordinates.

    // Checking if navigator.geolocation exists (so I won't get any errors)
    // if it exists
    if (navigator.geolocation)
      // here as the 1st Callback Function, which the one for 'success', since I'm in the class, I need to add 'this._loadMap'
      // JavaScript, we'll then call 'this._loadMap' Callback Function here and pass in the 'position' Argument (below), as soon as the Current Position of the User is determined.

      //// 2/2 And the _loadMap Method should be called with that Position
      // _loadMap Method is actually called by 'getCurrentPosition(this._loadmap)' Callback Function, therefore it is treated as a REGULAR FUNCTION CALL, NOT A METHOD CALL
      // since it's a Callback Function, I'm NOT calling it myself, it's the 'getCurrentPosition()' that will call this Callback once that it gets the Current Position of the User.
      // AND IN A REGULAR FUNCTION CALL, THE 'THIS KEYWORD' IS SET TO 'UNDEFINED'.!!!
      // That's why I changed it to 'this._loadMap.bind(this)', and that's exactly the THIS Keyword thatI also want inside _loadMap(position) {}
      // bind() will return a New Function
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // manually Binding the This Keyword, which will point to the Current Object
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
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
    this.#map = L.map('map').setView(coords, 13); // 13 zoom level
    //console.log(map);

    // Added titeLayer
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map); // Added tileLayer to the 'map' using .addTo

    // 'on' Method comes from the Leaflet Library, and this 'map' Object here is an Object that was generated by Leaflet 'L', (therefore this is gonna be a Special Object, with a couple of Methods and Properties on it)
    // Adding the eventListener to the Map for handeling any incoming Clicks.
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    // When the 'click' on the 'map' happens, It will show the 'form'.
    form.classList.remove('hidden');
    // after 'form' appears, it should straight be selected (to type in) the 'distance' field input, because of the Focus Method
    inputDistance.focus();
  }

  _toggleElevationField() {
    // selecting the Closest Parent with the 'form__row' Class
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden'); // closest() Method is like an INVERSE querySelector, it selects Parents and Not Children
    // doing the same on inputCadence
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden'); // closest() Method is like an INVERSE querySelector, it selects Parents and Not Children
  }

  // Submitting the 'form' for the newWorkout will create a new newWorkout
  _newWorkout(e) {
    e.preventDefault(); // after 'enter' the Page won't reload!
    //// CLEAR INPUT FIELDS
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    //// DISPLAY MARKER
    console.log(this.#mapEvent);
    // Taking the Latitude & Longitude from this 'map' Object
    const { lat, lng } = this.#mapEvent.latlng;
    // Putting the Marker exactly where user Clicks
    // L.marker creates t he Marker
    // .addTo add the Marker to the 'map'
    // .bindPopup wll create a popup and Bind it to the Marker
    L.marker([lat, lng])
      .addTo(this.#map)
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
  }
}

const app = new App(); // inside of the App Class, there is a Method that gets executed as soon as this 'const app' here is created!

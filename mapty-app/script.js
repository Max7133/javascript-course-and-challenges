'use strict';

class Workout {
  // Creating date = and id = like this, is something New in JavaScript that has not been implemented to the language yet
  // Date where the Object is created (the date in which the Workout happened)
  date = new Date();
  // ID (Unique Identifier)
  // Creating ID using Date.now that shows the Current Time Stamp of right now, then convert that to a String and then take the last 10 Numbers.
  id = (Date.now() + '').slice(-10);
  // On All the 'workouts' adding a Property 'clicks'
  clicks = 0;
  // Will take in the Data that is common to both 'workouts'
  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  // Whenever a New Object is created, then Automatically this Description will be Set
  _setDescription() {
    // for telling the Prettier, to IGNORE the Next Line
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // the 'description' will be based on the 'type' of the Activity
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`; //Changing the lower (type = 'running'), to Uppercase, then with slice() the rest of the 'type' letters,
  } // and then Month which is 0 based, like an Array, so I wrap it in Array, and day

  // Every Object gets this Method
  click() {
    this.clicks++; // Will increase the Number of Clicks
  }
}

// I won't directly create a 'workout'
// Instead I will always either create a Running or a Cycling Object (Child Classes)
class Running extends Workout {
  type = 'running'; // This Property that's gonna be available on all the Instances
  // will take same Data as Parent Class 'Workout' + additional Properties on a Running Object
  constructor(coords, distance, duration, cadence) {
    // calling the Super Class with Arguments that are also in the Parent Class, and this will initialize the THIS Keyword
    super(coords, distance, duration);
    this.cadence = cadence;
    // it's fine to Call Any Code in a Constructor (did the same in the App Class for Other Methods)
    this.calcPace();
    // _setDescription will work here perfectly fine, because through the Scope Chain, this Constructor will get access to All the Methods of the Parent Class
    // and so then as the Method is executed here, it will Also get access to the 'type'
    this._setDescription(); // setting in the Description from _setDescription()
  }
  // Method for Calculating the Phase is defined in Minutes per Kilometer
  calcPace() {
    // adding New 'pace' Property = minutes / kilometers (the Distance)
    this.pace = this.duration / this.distance;
    return this.pace; // returning this Data, in case someplace in the Code ill need it
  }
}

class Cycling extends Workout {
  type = 'cycling'; // This Property that's gonna be available on all the Instances

  constructor(coords, distance, duration, elevationGain) {
    // calling the Super Class with Arguments that are also in the Parent Class, and this will initialize the THIS Keyword
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    //this.type = 'cycling'; // same thing upper
    this.calcSpeed();
    // _setDescription will work here perfectly fine, because through the Scope Chain, this Constructor will get access to All the Methods of the Parent Class
    // and so then as the Method is executed here, it will Also get access to the 'type'
    this._setDescription(); // setting in the Description from _setDescription()
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
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  // I'm gonna Define the 'map' & 'mapEvent' as Properties of the Object, using Private Classes
  #map; // both of them will now become Private Instance Properties
  #mapZoomLevel = 13;
  #mapEvent; // Properties that are gonna be present on All the Instances created through this Class
  #workouts = [];

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
    // adding the eventHandler to the Parent Element, calling it here, so it will be added right in the beginning
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel); // 13 zoom level
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

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // Immediately hiding the form first
    form.getElementsByClassName.display = 'none';
    // Adding Hidden Class
    form.classList.add('hidden');
    // after 1 second, I set this Display Property from CSS back to Grid
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    // selecting the Closest Parent with the 'form__row' Class
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden'); // closest() Method is like an INVERSE querySelector, it selects Parents and Not Children
    // doing the same on inputCadence
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden'); // closest() Method is like an INVERSE querySelector, it selects Parents and Not Children
  }

  // Submitting the 'form' for the newWorkout will create a new newWorkout
  _newWorkout(e) {
    // Helper Function that takes in an Arbitrary Number of Inputs
    // it will Loop over the Array, and in each of them it will check whether the Number isFinite or Not
    // and then in the end, the every() Method will only Return True if this value was true (Number.isFinite(inp) for ALL Elements in the Array)
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault(); // after 'enter' the Page won't reload!

    // Get data from form

    const type = inputType.value;
    const distance = +inputDistance.value; // this always come as String, so I convert it to a Number with '+'
    const duration = +inputDuration.value;
    // Taking the Latitude & Longitude from this 'map' Object
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object

    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid (each of them should be a Number)
      // If the distance or duration or cadence is Not a Number for that isFinite(), then return immediately
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence) // if all of the Inputs are Not Valid, OR if there is Any Number that is Not Positive
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object

    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) || // if all of the Inputs are Not Valid, OR if there is Any Number that is Not Positive
        !allPositive(distance, duration) // no 'cadence' because the Elevation might be Negative
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);
    console.log(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout); // Passing in 'workout' Object, for displaying the Data

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + clear input fields
    //// CLEAR INPUT FIELDS
    this._hideForm();
  }

  _renderWorkoutMarker(workout) {
    // Putting the Marker exactly where user Clicks
    // L.marker creates t he Marker
    // .addTo add the Marker to the 'map'
    // .bindPopup wll create a popup and Bind it to the Marker
    L.marker(workout.coords) // coords coming from the 'workout'
      .addTo(this.#map)
      //.bindPopup('Workout') Instead of specifying a String
      // I will create a brand New Popup Object L.popup({...}), which will contain a couple of Options.
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false, // overriding the behavior of the Popup closing, when another Popup is opened.
          closeOnClick: false, // will prevent Popups from closing whenever the User Clicks on the Map.
          className: `${workout.type}-popup`, // for customizing Popup (using this one to Assign Any CSS Class Name that I want to the Popup)
        })
      )
      // these 2 Methods always Returned THIS Keyword (the Current Object), therefore they can be CHAINABLE
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }
  // will take in an Object 'workout'
  _renderWorkout(workout) {
    // Creating 'markup' (some HTML) and then I will insert that into the DOM whenever there is a New Workout
    let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}"> 
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
  `;

    if (workout.type === 'running')
      // Then I want to add something to HTML
      html += `
       <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
     </li>
     `;

    if (workout.type === 'cycling')
      html += `
       <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
     </li>
     `;

    // 'afterend' - because this one will add the New Element as a Sibling Element at the end of the 'form'
    form.insertAdjacentHTML('afterend', html);
  } // we use Data Properties like 'data-id' to usually build a bridge between the UI and Data from the App

  _moveToPopup(e) {
    // creating the Workout Element, e.target - Clicked Element, then I will look for the 'closest' Workout Parent
    const workoutEl = e.target.closest('.workout'); // closest() opposite of a querySelector()
    console.log(workoutEl); // The Element is the one with the Class 'workout', wherever the 'click' happens in the Element, no mather if it's in one of the <div></div> or <span></span>,
    // all of it will end up in the Li element with the 'workout' Class < class="workout workout"...>, because from the Element that is Clicked, it will move UP to that exact Element there using the closest();
    if (!workoutEl) return; // ignoring 'null' if clicked outside of a 'workoutEl'
    // Getting the Workout Data out of the Workouts Array
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    ); // find() will Find an Element of the Array, each Element in the Workouts Array (work), and then I want the one which has 'work.id === to that ID' from the DOM
    console.log(workout);

    // Taking the 'coords' from the Element, and move the 'map' to that Position
    // in Leaflet Library setView() does exactly that! This setView() is available on All Map Objects
    // I will take the '#map' Object that I already have, and then I call the setView()
    // 1st Argument of setView() is the coordinates, 2nd Argument is the Zoom Level, and then passing in the Object of Options
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1, // Animation duration
      },
    });

    //// using the Public Interface
    // Taking the 'workout' Object and using that Public Interface
    workout.click(); // Will Count the 'clicks' that happen on Each of the workouts, when I click on them on the UI, after I can check how many times I clicked it
  }
}

const app = new App(); // inside of the App Class, there is a Method that gets executed as soon as this 'const app' here is created!

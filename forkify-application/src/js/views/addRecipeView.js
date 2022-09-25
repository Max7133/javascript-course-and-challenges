import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

// child Class 'ResultsView' inherits from parent Class 'View' all its Methods
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    // Since this is a Child Class I need to start by calling super(), and only after that, I can use the This Keyword
    super();
    this._addHandlerShowWindow(); // addHandlerShowWindow is only going to be used in this Class, that's why I marked it as PROTECTED
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    // Taking the _overlay & _window and removing the Hidden Class
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    // the This Keyword inside of a Handler Funtion points to the Element on which that listener is attached to.
    // Manually setting the This Keyword inside of the toggleWindow() now to the This Keyword that I want it to be.
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this)); // and so this This Keyword, points to the Current Object
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this)); // and so this This Keyword, points to the Current Object
    this._overlay.addEventListener('click', this.toggleWindow.bind(this)); // and so this This Keyword, points to the Current Object
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // FormData is a Browser API
      // Into the FormData Constructor, I need to pass in an Element that is a Form
      // In this case that Form is the This Keyword, I'm inside of a Handler Function, and so This Keyword points to the this._parentElement which is the Upload Form
      // It will return an Object that I cannot use, that's why I will speed it into an Array
      const dataArr = [...new FormData(this)]; // this will give an Array, containing all the Fields with all the Value in there.
      // this is opposite of the entries()
      // This one takes an Array of Entries and converts it to an Object
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();

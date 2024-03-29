import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

// child Class 'ResultsView' inherits from parent Class 'View' all its Methods
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again.';
  _message = '';

  _generateMarkup() {
    console.log(this._data); // gets access to Data
    // maping over that Data, and so for each of the Bookmarks,
    // it will render a Preview, and return as a String, so that then in the View.js it can insert that Markup into the DOM.
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();

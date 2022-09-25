import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

// child Class 'BookmarksView' inherits from parent Class 'View' all its Methods
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  // Will immediately render the Bookmarks right at the beginning when the Page is Loaded
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._data); // gets access to Data
    // maping over that Data, and so for each of the Bookmarks,
    // it will render a Preview, and return as a String, so that then in the View.js it can insert that Markup into the DOM.
    return this._data
      .map(bookmarks => previewView.render(bookmarks, false))
      .join('');
  }
}

export default new BookmarksView();

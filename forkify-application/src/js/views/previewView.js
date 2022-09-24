import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

// child Class 'PreviewView' inherits from parent Class 'View' all its Methods
class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    // Marking the Current Recipe as Selected on the UI, the Class for that is 'preview__link--active'
    const id = window.location.hash.slice(1); // takes everything except the 1st element
    // the # will Change, then the Recipe will get loaded, and the entire search results view will be Updated,
    // and the ID of the result is the same one in the Browser Link, therefore it will get that Active Class 'preview__link--active'
    return `
    <li class="preview">
      <a class="preview__link ${
        this._data.id === id ? 'preview__link--active' : ''
      }" href="#${this._data.id}">
        <figure class="preview__fig">
          <img src="${this._data.image}" alt="${this._data.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${this._data.title}</h4>
          <p class="preview__publisher">${this._data.publisher}</p>
        </div>
      </a>
    </li>
  `;
  }
}

export default new PreviewView();

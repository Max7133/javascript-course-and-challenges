import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

// child Class 'ResultsView' inherits from parent Class 'View' all its Methods
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again.';
  _message = '';

  _generateMarkup() {
    console.log(this._data); // will be exactly model.state.search.results
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    // Marking the Current Recipe as Selected on the UI, the Class for that is 'preview__link--active'
    const id = window.location.hash.slice(1); // takes everything except the 1st element
    // the # will Change, then the Recipe will get loaded, and the entire search results view will be Updated,
    // and the ID of the result is the same one in the Browser Link, therefore it will get that Active Class 'preview__link--active'
    return `
    <li class="preview">
      <a class="preview__link ${
        result.id === id ? 'preview__link--active' : ''
      }" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
        </div>
      </a>
    </li>
  `;
  }
}

export default new ResultsView();

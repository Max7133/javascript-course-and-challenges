import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

// child Class 'ResultsView' inherits from parent Class 'View' all its Methods
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline'); // closest() searches Up the Tree (for Parents)
      console.log(btn);
      handler();
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    // Checking how many Pages there are
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    // Last page
    if (curPage === numPages) {
      return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
         <span>Page ${curPage - 1}</span>
        </button>
        `;
    }
    // Other page
    if (curPage < numPages) {
      return `
        <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
         <span>Page ${curPage - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        `;
    }

    // Page 1, and there are NO other pages
    return ''; // I don't want to render any Button in this case
  }
}

export default new PaginationView();

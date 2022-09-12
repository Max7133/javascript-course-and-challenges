import View from './View.js';

// import icons from '../../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2
import { Fraction } from 'fractional'; // library for Numbers like 1/2 instead of 0.5

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  // Publisher Method (addHandlerRender) needs to get access to the Subscriber Handler Function (handler) (it's called constrolRecipes in controller.js)
  // Renders the recipe right at the beginning
  // This Function listens for Events
  addHandlerRender(handler) {
    // INSTEAD
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));

    // window.addEventListener('hashchange', handler);
    // window.addEventListener('load', handler); // fired off Immediately after the Page has completed loading
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // selecting that Button Element that was clicked or not
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      //const updateTo = btn.dataset.updateTo;
      const { updateTo } = btn.dataset;
      // converting to a Number below, because otherwise it will convert +btn.dataset to a Number, and then updateTo from there won't work
      if (+updateTo > 0) handler(+updateTo); // It won't update the Servings 0 or anything below
    });
  }

  // Returns an HTML String
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
  }

  _generateMarkupIngredient(ing) {
    return `
       <li class="recipe__ingredient">
         <svg class="recipe__icon">
           <use href="${icons}#icon-check"></use>
         </svg>
         <div class="recipe__quantity">${
           ing.quantity ? new Fraction(ing.quantity).toString() : ''
         }</div>
         <div class="recipe__description">
           <span class="recipe__unit">${ing.unit}</span>
           ${ing.description}
         </div>
       </li>
    `;
  }
}

// creating an Object and Exporting it, like this, no one from the outside of this Class here will have access to anything, except for the Object
export default new RecipeView(); // I'm not passing any Data in, therefore I don't need any Constructor

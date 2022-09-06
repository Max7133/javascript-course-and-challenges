// import icons from '../../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2
import { Fraction } from 'fractional'; // library for Numbers like 1/2 instead of 0.5
console.log(Fraction);

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;
  #errorMessage = 'We could not find that recipe. Please try another one!';
  #message = '';

  render(data) {
    this.#data = data; // render() takes that Data from recipeView.render(model.state.recipe); (controller.js), and stores it inside 'this.data'
    const markup = this.#generateMarkup();
    this.#clear(); // calling the #clear()
    this.#parentElement.insertAdjacentHTML('afterbegin', markup); // renders HTML on the Page
  } // this is so that I can use this Data all over the place inside of this Object

  // this Method will be usable for all the Views that hace a 'parentElement' Property
  #clear() {
    this.#parentElement.innerHTML = '';
  }

  // Public Method, so that the Controller can then call this Method here as it starts fetching the Data
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    // Before inserting, I'm clearing the Parent Element
    //this.#parentElement.innerHTML = '';
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Renders Error on the UI
  renderError(message = this.#errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Renders Success Message on the UI
  renderMessage(message = this.#message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
        `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Publisher Method (addHandlerRender) needs to get access to the Subscriber Handler Function (handler) (it's called constrolRecipes in controller.js)
  // Renders the recipe right at the beginning
  // This Function listens for Events
  addHandlerRender(handler) {
    // INSTEAD
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));

    // window.addEventListener('hashchange', handler);
    // window.addEventListener('load', handler); // fired off Immediately after the Page has completed loading
  }

  // Returns an HTML String
  #generateMarkup() {
    return `
    <figure class="recipe__fig">
          <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.#data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.#data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
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
          ${this.#data.ingredients.map(this.#generateMarkupIngredient).join('')}
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.#data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
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

  #generateMarkupIngredient(ing) {
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

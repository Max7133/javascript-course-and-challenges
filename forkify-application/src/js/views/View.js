// import icons from '../../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;
  render(data) {
    // if NO data or if there IS data but that data IS an Array and it is Empty, then immediately Return!
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data; // render() for e.g. takes that Data from recipeView.render(model.state.recipe); (controller.js), and stores it inside 'this.data'
    const markup = this._generateMarkup();
    this._clear(); // calling the _clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // renders HTML on the Page
  } // this is so that I can use this Data all over the place inside of this Object

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    // Converting this Markup String to a DOM Object that's living in the Memory which I can then use to Compare with the actual DOM that's on the page.
    const newDOM = document.createRange().createContextualFragment(newMarkup); // I passed in the String of newMarkup, like a string of HTML
    // createContextualFragment() will then convert that String into real DOM Node Objects,'newDOM' here will become like a Big Object,
    // which is like a Virtual DOM. So a DOM that is not really living on the Page, but which live in our Memory.

    // And so now I can use that DOM as if it was the real DOM on the Page.
    const newElements = newDOM.querySelectorAll('*'); // selected all Elements in there
    console.log(newElements); // will show all the Elements that will be contained inside of this newDOM Element, that was created from generating the 'newMarkup' for the Updated Data
  }

  // this Method will be usable for all the Views that hace a 'parentElement' Property
  _clear() {
    this._parentElement.innerHTML = '';
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
    //this._parentElement.innerHTML = '';
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Renders Error on the UI
  renderError(message = this._errorMessage) {
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
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Renders Success on the UI
  renderMessage(message = this._message) {
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
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

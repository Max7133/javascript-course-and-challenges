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

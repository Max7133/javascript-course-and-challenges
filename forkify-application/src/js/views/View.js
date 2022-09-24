// import icons from '../../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;
  render(data, render = true) {
    // if NO data or if there IS data but that data IS an Array and it is Empty, then immediately Return!
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data; // render() for e.g. takes that Data from recipeView.render(model.state.recipe); (controller.js), and stores it inside 'this.data'
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear(); // calling the _clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // renders HTML on the Page
  } // this is so that I can use this Data all over the place inside of this Object

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Converting this Markup String to a DOM Object that's living in the Memory which I can then use to Compare with the actual DOM that's on the page.
    const newDOM = document.createRange().createContextualFragment(newMarkup); // I passed in the String of newMarkup, like a string of HTML
    // createContextualFragment() will then convert that String into real DOM Node Objects,'newDOM' here will become like a Big Object,
    // which is like a Virtual DOM. So a DOM that is not really living on the Page, but which live in our Memory.

    // And so now I can use that DOM as if it was the real DOM on the Page.
    const newElements = Array.from(newDOM.querySelectorAll('*')); // selected all Elements in there
    //console.log(newElements); // will show all the Elements that will be contained inside of this newDOM Element, that was created from generating the 'newMarkup' for the Updated Data

    // Getting all the actual Elements that are currently on the Page by selecting them
    // (so then I can compare them, and only change what happened from the newDOM to the actual current DOM which is on the Page)
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // newElements & curElements returns a Node list, so I will convert them to an Array

    // Comparing newElements to curElements
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      //// Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== '' // firstChild will return a Node, and this Child Node contains the 'text' that is nodeValue and it should Not be Empty + trim any white space
        // in all other Elements that don't contain text directly, the nodeValue will be Null, therefore, this whole Expression will be False, and this replacement here does not take place
      ) {
        // then change the text content of the curEl to newEl (this will update the DOM only in places where it has changed)
        curEl.textContent = newEl.textContent;
      }
      //// Updates changed ATTRIBUTES
      // now changing the Attributes when the newEl is different from the curEl
      if (!newEl.isEqualNode(curEl))
        // Converting the 'data-update-to' Object to an Array, and then loop over that Array and copy All the Attributes from newEl to curEl
        Array.from(newEl.attributes).forEach(
          attr => curEl.setAttribute(attr.name, attr.value) // replacing All the Attributes in the curEl by the Attributes coming from the newEl
        );
    });
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

// This Class gets the Query and listens for the Click Event on the Button
class SearchView {
  _parentEl = document.querySelector('.search');

  // it will Return the parentEl (search Class), and from there I will select the Input Field, and get the Value
  getQuery() {
    // Get Query
    const query = this._parentEl.querySelector('.search__field').value;
    // Clear the field
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  // Publisher, controlSearchResults() from controller.js - Subscriber
  addHandlerSearch(handler) {
    // cannot call 'handler' immediately because when submiting the form, first preventDefault()
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    }); // will work if the User clicks Submit Button / Enter Key
  }
}

export default new SearchView();

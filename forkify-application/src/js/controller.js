import * as model from './model.js'; // imports everything from 'model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable'; // Polyfills everything else
import 'regenerator-runtime/runtime'; // Polyfilling Async/Await
import { async } from 'regenerator-runtime';

// the state of the Page will remain the same (won't reload and clear results)
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // the entire URL + hash, slice(1) remove 1st El #
    console.log(id); // 5ed6604591c37cdc054bc886

    if (!id) return;
    recipeView.renderSpinner(); // this will automatically render the spinner on the View

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage()); // passing in the Current Page

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks); // highlights selected bookmark

    // 2) Loading recipe
    // not storing it into a Variable, because this Function doesn't Return anything
    await model.loadRecipe(id); // loadRecipe is an Async Function, it Returns a Promise, therefore I'm Awaiting

    // 3) Rendering recipe
    // this 'render()' Method, will accept this data, and store it into the Object
    recipeView.render(model.state.recipe); // model.state.recipe is that 'data' I have received from Step 1 Loading recipe, and then that data is passed into the render(),
    // and then render() takes that data and stores it inside of this.#data in 'recipeView.js'
  } catch (err) {
    recipeView.renderError();
  }
};

// This will call the Async Function loadSearchResults from 'model.js'
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search results
    await model.loadSearchResults(query); // not storing into a Variable, because it doesn't Return anything, only manipulates the State

    // 3) Render results
    //resultsView.render(model.state.search.results); // 59 pizzas
    resultsView.render(model.getSearchResultsPage()); // start with Page 1

    // 4) Render initial pagination buttons (render() will Overwrite the 'markup' that was there previously, because of the clear())
    paginationView.render(model.state.search); // passing in the entire search Object
  } catch (err) {
    console.log(err);
  }
};

// Will be executed whenever a Click on one of the Buttons happens
const controlPagination = function (goToPage) {
  // 1) Render NEW results
  //resultsView.render(model.state.search.results); // 59 pizzas
  resultsView.render(model.getSearchResultsPage(goToPage)); // when getting results with getSearchResultsPage(goToPage) for e.g. Page 4, then in the model.js state.search.page gets updated

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search); // then it will render the new Pagination, and render new Buttons
};

// Will be executed when the User clicks on 1 of the SERVINGS - + Buttons, it will Increase of Decrease the Servings by 1, and also adjust all Ingredients below
const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view (by overwriting the Complete Recipe) TEMP!
  //recipeView.render(model.state.recipe);

  // Update Method() will only update Text and attributes in the DOM, without having to re-render the Entire View like with the render() previosly
  recipeView.update(model.state.recipe);
};

// Controller for adding a New Bookmark
const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

// As the Page tries to Update the bookmarksView, the Bookmarks are already there (Otherwise will Be an Error, because it will try to Update the bookmark list that it will not able to at Line 29)
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// will receive New Recipe data for the Upload Form
const controlAddRecipe = async function (newRecipe) {
  try {
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

// as soon as the Program loads the 'init' Function is called which immediatelly calls the addHandlerRender Publisher Method from recipeView.js
// (that's possible because controller.js Imports BOTH the recipeView.js & model.js)
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes); // controlRecipes executes as soon as the Event happens, which is defined as 'handler' Argument in recipeView.js in addEventListener()
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults); // same logic
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

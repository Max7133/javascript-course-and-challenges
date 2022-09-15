import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
// exporting all these for using later from the 'controller.js'
// contains all the Data about the App
export const state = {
  recipe: {},
  search: {
    query: '', // don't need it for now, but maybe sometime I will need it
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    //let recipe = data.data.recipe;
    // Since I had 2 recipes on both sides, I used Destructuring on that Object
    const { recipe } = data.data;
    // Formating the Data by creating a New Object, based on this Object which has better Variable Names
    // while removing Underscores & adding camelCase instead
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // If there is any bookmark, which has the bookmark ID === to the ID that we just received
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      // then I want the Current Recipe which is state.recipe to be bookmarked
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
  } catch (err) {
    // Temp error handling
    console.error(`${err} 🔥🔥🔥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    // the (data) that I get from console.log()
    // this returns a new Array with the new Objects
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // when loads new search results, then the Page will reset to 1
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 🔥🔥🔥`);
    throw err; // throwing the Error again, so I can use it in the Controller
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  console.log(page);
  // e.g the requested page is 1, then 1 - 1 = 0 * 10 = 0
  // e.g the requested page is 2, then 2 - 1 = 1 * 10 = 10
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  // e.g then page is 1 * 10 = 10
  // e.g then 2 * 10 = 20
  const end = page * state.search.resultsPerPage; // 9;
  // returns the part of the results (e.g from Result 1 to Result 10)
  return state.search.results.slice(start, end); // slice() doesn't include the Last Value that I pass in
};

// this Function will reach into the State (Recipe Ingredients) and the change the Quantity Property in Ingredients Array of Objects
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity =
      (ing.quantity * newServings) / state.recipe.servings;
    // for e.g. Quantity 2 and changing from 4 Servings to 8 Servings
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4 (Double Servings means Double Quantity)
  });
  // Updating Servings in the State (Because otherwise, if updating the Servings twice, then by the 2nd time, I would still be using the Old Value of 2 Servings)
  state.recipe.servings = newServings; // I put this here at the End of the Function, because otherwise, I could not preserve this Old Original Value of state.recipe.servings
};

// This Function will receive a Recipe and then it will Set that Recipe as a Bookmark.
export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark Current Recipe as Bookmarked (state.recipe.id = ID of the Current Recipe)
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  // index - where the Element is located that I want to Delete
  const index = state.bookmarks.findIndex(el => el.id === id); // looking for the Element which has the ID === to the ID that was passed in.
  // There is going to be 1 Bookmark for which el.id === id is true, where the Current Bookmark.id is === to this ID
  // And so for this Element where this condition is true, the Index will be returned, and then I will take that Index and delete it from the Array
  // 1 - item that I want to delete
  state.bookmarks.splice(index, 1);

  // Mark Current Recipe as NOT Bookmarked (state.recipe.id = ID of the Current Recipe)
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

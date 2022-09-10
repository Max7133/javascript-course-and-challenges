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

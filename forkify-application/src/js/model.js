import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js'; // named import
//import { getJSON, sendJSON } from './helpers.js'; // named import
import { AJAX } from './helpers.js'; // named import
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

// Object that is created when uploading the recipe to the API
const createRecipeObject = function (data) {
  //let recipe = data.data.recipe;
  // Since I had 2 recipes on both sides, I used Destructuring on that Object
  const { recipe } = data.data;
  // Formating the Data by creating a New Object, based on this Object which has better Variable Names
  // while removing Underscores & adding camelCase instead
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
// if recipe.key is Falsy Value (doesn't exist) then nothing happens
// if recipe.key has a Value, then the second part of the Operator is executed and returned, this Object { key: recipe.key }
// then this whole Expression will become that Object, then I can spread it and put the Values here,
// and so that will then be the same as if the Values would be out here like this, key: recipe.key
// This was CONDITIONALLY ADDING PROPERTIES TO AN OBJECT (UPPER in return {})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    // If there is any bookmark, which has the bookmark ID === to the ID that we just received
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      // then I want the Current Recipe which is state.recipe to be bookmarked
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe); // all 59 recipes
  } catch (err) {
    // Temp error handling
    console.error(`${err} 🔥🔥🔥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    // ?key=${KEY} will then load all the recipe including the ones that contain My Own Key
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);

    // the (data) that I get from console.log()
    // this returns a new Array with the new Objects
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
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

// will store bookmarks to local storage in the browser, but not in UI
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks)); // converting state.bookmarks to a String
};

// This Function will receive a Recipe and then it will Set that Recipe as a Bookmark.
export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark Current Recipe as Bookmarked (state.recipe.id = ID of the Current Recipe)
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
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

  persistBookmarks();
};

// getting the Bookmarks from Local Storage, for showing them in the UI
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  // If there is Data in 'storage;, then state.bookmarks String will be converted back to an Object
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
console.log(state.bookmarks);

// Function that at some point I might want to call, later only during developement
const clearBookmarks = function () {
  localStorage.clear();
};
//clearBookmarks();

// Will eventually make a request to the API, and it will receive the Data for a new recipe
export const uploadRecipe = async function (newRecipe) {
  // First it takes the Raw input Data and transforms it into the same format as the Data that I also get out of the API.
  // Creating a New Array of ingredients (based on existing data), and converting the Object that I get in (newRecipe) back to an Array
  // And filtering so I can get only Properties that are Ingredients 1,2,3 etc...
  try {
    const ingredients = Object.entries(newRecipe)
      // the filter() the 1st Element of the Current Entry should start with Ingredient ans the 2nd one should exist, so it should not be an Empty String
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        // Taking the Data out of the String and putting it into an Object
        // So for that, I'm taking each Ingredient and Spliting it by ',' <-- Comma, and removing white space with an Empty String by using replaceAll()

        // const ingArr = ing[1] // ing[1] because this is the 2nd Entry - the Value (the 1st Entry was the Key)
        //   .replaceAll(' ', '')
        //   .split(','); // this should then Return an Array of 3 Elements

        // Splitting the String into multiple parts, which returns an Array, and then I will loop over that Array and trim() each of the Elements
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;
        // Returns an Object with this
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    // Creating an Object that is ready to be Uploaded
    // This Object will be the opposite of the state.recipe = {..object..}
    // that's is the Format that the API is ready to receive, it has to be exactly the way I received it
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // This will also send the Recipe back to the User (sendJSON has 2 Paremeters url & data)
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe); // ? to specift a list of Parameters
    // Storing the Data I get into the State
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

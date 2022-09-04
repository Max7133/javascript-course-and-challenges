import * as model from './model.js'; // imports everything from 'model.js'
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // Polyfills everything else
import 'regenerator-runtime/runtime'; // Polyfilling Async/Await

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // the entire URL + hash, slice(1) remove 1st El #
    console.log(id); // 5ed6604591c37cdc054bc886

    if (!id) return;
    recipeView.renderSpinner(); // this will automatically render the spinner on the recipeView

    // 1) Loading recipe
    // not storing it into a Variable, because this Function doesn't Return anything
    await model.loadRecipe(id); // loadRecipe is an Async Function, it Returns a Promise, therefore I'm Awaiting

    // 2) Rendering recipe
    // this 'render()' Method, will accept this data, and store it into the Object
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// INSTEAD
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes); // fired off Immediately after the Page has completed loading

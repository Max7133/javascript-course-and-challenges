import * as model from './model.js'; // imports everything from 'model.js'
import recipeView from './views/recipeView.js';
import 'core-js/stable'; // Polyfills everything else
import 'regenerator-runtime/runtime'; // Polyfilling Async/Await

const recipeContainer = document.querySelector('.recipe');

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
    recipeView.render(model.state.recipe); // model.state.recipe is that 'data' I have received from Step 1 Loading recipe, and then that data is passed into the render(),
    // and then render() takes that data and stores it inside of this.#data in 'recipeView.js'
  } catch (err) {
    console.log(err);
  }
};

// as soon as the Program loads the 'init' Function is called which immediatelly calls the addHandlerRender Publisher Method from recipeView.js
// (that's possible because controller.js Imports BOTH the recipeView.js & model.js)
const init = function () {
  recipeView.addHandlerRender(controlRecipes); // controlRecipes executes as soon as the Event happens, which is defined as 'handler' Argument in recipeView.js in addEventListener()
};

init();

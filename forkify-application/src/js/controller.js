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

const showRecipe = async function () {
  try {
    // Making an AJAX request to an API
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    // Converting result to JSON
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    //let recipe = data.data.recipe;
    // Since I had 2 recipes on both sides, I used Destructuring on that Object
    let { recipe } = data.data;
    // Formating the Data by creating a New Object, based on this Object which has better Variable Names
    // while removing Underscores & adding camelCase instead
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);
  } catch (err) {
    alert(err);
  }
};
showRecipe();

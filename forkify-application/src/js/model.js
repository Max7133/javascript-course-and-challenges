// exporting all these for using later from the 'controller.js'

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    // Making an AJAX request to an API
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    // Converting result to JSON
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

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
    alert(err);
  }
};

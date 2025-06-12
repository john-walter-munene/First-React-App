import { recipes } from "./data";

// Nested lists in one component

function InnerList({ ingredients }) {
  return (
    <ul>
      {ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
      ))}
    </ul>
  );
}

function RecipeItems({ recipes }) {
  return (
    <>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <InnerList ingredients={recipe.ingredients} />
        </div>
      ))}
    </>
  );
}

function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      <RecipeItems recipes={recipes} />
    </div>
  );
}

export { RecipeList };
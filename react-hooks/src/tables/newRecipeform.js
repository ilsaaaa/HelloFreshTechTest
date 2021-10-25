import React, { useState } from "react";

const NewRecipeForm = (props) => {
  const recipeFormState = { itemName: "", ingredients: "", instructions: "" };
  const [recipe, setRecipe] = useState(recipeFormState);

  const handleInputChange = (event, name) => {
    const { value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  //if either of the field are not entered then return a alert 
  const submitRecipe = async () => {
    if (!recipe.itemName || !recipe.ingredients || !recipe.instructions) {
        alert('Please enter all fields')
        return;
    }


    const result = await fetch("http://localhost:5000/recipe", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (result.status === 200) {
        alert('Succesfully added new recipe')
        setRecipe(recipeFormState)
    }
    console.log("test", result);
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input
        type="text"
        onChange={(event) => handleInputChange(event, "itemName")}
        class="form-control"
        placeholder="Recipe Name"
        aria-label="Recipe Name"
      />
      <input
        type="text"
        onChange={(event) => handleInputChange(event, "ingredients")}
        class="form-control"
        placeholder="Ingredients"
        aria-label="Ingredients"
      />
      <input
        type="text"
        onChange={(event) => handleInputChange(event, "instructions")}
        class="form-control"
        placeholder="Instructions"
        aria-label="Instructions"
      />

      <button
        onClick={() => submitRecipe()}
        type="button"
        className="btn btn-primary"
      >
        Submit New Recipe
      </button>
    </form>
  );
};

export default NewRecipeForm;

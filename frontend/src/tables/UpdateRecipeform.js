import React, { useState } from 'react'

const UpdateRecipeForm = (props) => {
  const [recipe, setRecipe] = useState(props.currentRecipe)

  console.log(recipe)

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setRecipe({ ...recipe, [name]: value })
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        props.updateUser(recipe.id, recipe)
      }}
    >
      <input
        type="text"
        name="RecipeName"
        value={recipe.name}
        onChange={handleInputChange}
        class="form-control"
        placeholder="Recipe Name"
        aria-label="Recipe Name"
      />

      <input
         type="text"
         name="ingredients"
         value={recipe.ingredients}
         onChange={handleInputChange}
         class="form-control"
        placeholder="Ingredients"
        aria-label="Ingredients"
       />
      
      <button>Update user</button>
      <button
        onClick={() => props.setUpdate(false)}
        className="btn btn-primaryS"
      >
        Cancel
      </button>
    </form>
  )
}

export default UpdateRecipeForm;
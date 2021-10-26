import React, { useState } from 'react'
import RecipeTable from './tables/RecipeTable'
import NewRecipeForm from './tables/NewRecipeform' 
import './App.css'

const App = () => {

  //This is example data 
  const RecipeData = [
    { id: 1, name: 'Chicken'  },
    { id: 2, name: 'Beef' },
    { id: 3, name: 'Lamb' },
  ]
  
  //using a setter for view the recipes 
  const [recipes, setRecipe] = useState(RecipeData)
  const [currRoute, setRoute] = useState('viewRecipes')

  // set up setter for update and it's form state
  const [update, setUpdate] = useState(false)
  const updateRecipeFormState = { itemName: "", ingredients: "", instructions: "", nutritionalInfo: "", classification: "" }
  const [currentRecipe, setCurrentRecipe] = useState(updateRecipeFormState)

  //When Update is selected on a user, it should turn on Update mode, and set the current recipe
  const updateRow = (recipe) => {
    setUpdate(true)
  
    setCurrentRecipe({ itemName: recipe.itemName, ingredients: recipe.ingredients, instructions: recipe.instructions, nutritionalInfo: recipe.nutritionalInfo, classification: recipe.classification })
  }

  //the update function needs to map through the array, and update the user that matches the ID passed through
  const updateRecipe = (id, updatedRecipe) => {
    setUpdate(false)
  
    setRecipe(recipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))) //ternary operation 
  }

  /* Calling out const to delete Recipe */
  const deleteRecipe = (id) => {
    setRecipe(recipes.filter((recipe) => recipe.id !== id))
  }

  return (
  //lay-out of the application
    <div className="container">
      <h1>MENU PLANNING APP</h1>
      <div className="flex-row mt-5">
        {currRoute === 'addRecipes' && (
            <div className="flex-large addRecipe">
                <h2 className="text-center">Add Recipe</h2>
                <NewRecipeForm /> 
                <button type="button" className="btn btn-primary" onClick={() => setRoute('viewRecipes')}>View all recipes</button>

            </div>  
        )}

        {currRoute === 'viewRecipes' && (
            <div className="flex-large viewRecipe">
                <h2 className="text-center">View Recipes</h2>
                <RecipeTable recipes={recipes} deleteRecipe={deleteRecipe} updateRow={updateRow} />
                <button type="button" className="btn btn-primary" onClick={() => setRoute('addRecipes')}>Add Recipe</button>
            </div>          
        )}
      </div>
    </div>
  )
}

export default App
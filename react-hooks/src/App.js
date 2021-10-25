import React, { useState } from 'react'
import RecipeTable from './tables/RecipeTable'
import NewRecipeForm from './tables/NewRecipeform' 
import './App.css'

const App = () => {

  const RecipeData = [
    { id: 1, name: 'Chicken'  },
    { id: 2, name: 'Beef' },
    { id: 3, name: 'Lamb' },
  ]
  

  const [recipes, setRecipe] = useState(RecipeData)
  const [currRoute, setRoute] = useState('viewRecipes')

  /* Calling out const to delete Recipe */
  const deleteRecipe = (id) => {
    setRecipe(recipes.filter((recipe) => recipe.id !== id))
  }

  return (
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
                <RecipeTable recipes={recipes} deleteRecipe={deleteRecipe} />
                <button type="button" className="btn btn-primary" onClick={() => setRoute('addRecipes')}>Add Recipe</button>
            </div>          
        )}
      </div>
    </div>
  )
}

export default App
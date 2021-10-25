import React, { useState } from 'react'
import RecipeTable from './tables/RecipeTable'
import './App.css'

const App = () => {

  const RecipeData = [
    { id: 1, name: 'Chicken'  },
    { id: 2, name: 'Beef' },
    { id: 3, name: 'Lamb' },
  ]

  const [recipes, setRecipe] = useState(RecipeData)

  /* Calling out const to delete Recipe */
  const deleteRecipe = (id) => {
    setRecipe(recipes.filter((recipe) => recipe.id !== id))
  }

  return (
    <div className="container">
      <h1>MENU PLANNING APP</h1>
      <div className="flex-row">
        <div className="flex-large addRecipe">
          <h2>Add Recipe</h2>
        </div>
        <div className="flex-large viewRecipe">
          <h2>View Recipe</h2>
          <RecipeTable recipes={recipes} deleteRecipe={deleteRecipe} />
        </div>
      </div>
    </div>
  )
}

export default App
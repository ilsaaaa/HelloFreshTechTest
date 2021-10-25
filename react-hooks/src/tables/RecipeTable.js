import React from 'react'
import './RecipeTable.css'

const RecipeTable = (props) => (
  <table>
    <thead>
      <tr>
      <th> Recipe ID </th>
        <th> Recipe Name</th>
        <th>Actions</th>
        <th> Select</th>
      </tr>
    </thead>
    <tbody>
      {props.recipes.length > 0 ? (
        props.recipes.map((recipe) => (
          <tr key={recipe.id}>
            <td>{recipe.id}</td>
            <td>{recipe.name}</td>
            <td>
              <button className="button muted-button">Update</button>
              
              {/* deletes the recipe in the table */}
              <button 
              className="button muted-button"
              onClick={() => props.deleteRecipe(recipe.id)}
              > Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No recipes</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default RecipeTable
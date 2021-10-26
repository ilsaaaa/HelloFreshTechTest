import React, { useState, useEffect } from "react";
import "./RecipeTable.css";

const RecipeTable = (props) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/recipe", {
      method: "GET",
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data.result);
        setRecipes(data.result);
      });
  }, []);

  const deleteRecipe = (id) => {
    return fetch(`http://localhost:5000/recipe/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.result);
      });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th> Recipe Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <tr key={recipe._id}>
              <td>{recipe.itemName}</td>
              <td>
                <button className="btn btn-primary muted-button">Update</button>

                {/* deletes the recipe in the table */}
                <button
                  className="btn btn-secondary muted-button"
                  onClick={() => deleteRecipe(recipe._id)}
                >
                  {" "}
                  Delete
                </button>
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
  );
};

export default RecipeTable;

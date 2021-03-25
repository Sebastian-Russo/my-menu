import React, { useState } from 'react';
import { Checkbox } from './checkbox';
import '../styling/recipe-form.css';

export const RecipeForm = ({addRecipe}) => {
  const [input, setInput] = useState({name: "", ingredients: "", directions: "", categories: []});

  const handleCategories = (array) => {
    console.log(array)
    setInput({...input, categories: array})
  }

  const handleChange = e => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault(); 
    addRecipe(input)
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>

      <div className="row">
        <label htmlFor="name">Recipe Name</label>
        <input type="text" name="name" value={input.name} placeholder="recipe name" onChange={handleChange}/>
      </div>
      
      <div className="row">
        <label htmlFor="ingredients">Ingredients and Amount</label>
        <textarea type="text" name="ingredients" value={input.ingredients} placeholder="add ingredients and amount" onChange={handleChange}/>
      </div>

      <div>
        <Checkbox handleCategories={handleCategories}/>
      </div>

      <div className="row">
        <label htmlFor="directions">Directions</label>
        <textarea type="textarea" name="directions" value={input.directions} placeholder="break directions into steps" onChange={handleChange}/>
      </div>

      <button type="submit">Create Recipe</button>

    </form>
  )
}
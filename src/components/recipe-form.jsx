import React, { useState } from 'react';
import axios from 'axios';
import { Checkbox } from './checkbox';
import '../styling/recipe-form.css';

export const RecipeForm = ({addRecipe}) => {
  const [input, setInput] = useState({name: "", ingredients: "", directions: "", categories: []});


  const sendData = async () => {
    try {
      const API_BASE_URL = 'https://ji1u25w37c.execute-api.us-east-2.amazonaws.com/production/recipe'
      const payload = {
        itemId: `${Math.floor(Math.random() * (999999999 - 0 + 1)) + 999999999}`,
        name: input.name,
        ingredients: input.ingredients,
        directions: input.directions,
        categories: input.categories
      }
      const config = {
        method: 'POST',
        data: payload,
        url: API_BASE_URL
      }  
      const request = await axios(config)
      console.log(request)

      // const request = await axios.post('https://ji1u25w37c.execute-api.us-east-2.amazonaws.com/production/recipe', payload)

      console.log(request)
    } catch(err) {
      console.error(err)
    }
  }


  const handleCategories = (array) => {
    console.log(array)
    setInput({...input, categories: array})
  }

  const handleChange = e => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    addRecipe(input)
    sendData()
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
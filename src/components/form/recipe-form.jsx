import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox } from './checkbox';
import { NewCategory } from "./new-category";
import '../../styling/recipe-form.css';


export const RecipeForm = ({addRecipe, editItem}) => {
  const [data, setData] = useState({name: "", ingredients: "", directions: "", categories: [], itemId: ""});
  const [toggleCheck, setToggleCheck] = useState(false);

  const API_BASE_URL = 'https://ji1u25w37c.execute-api.us-east-2.amazonaws.com/production/recipe';
  
  // type error: cannot read property 'itemId' of null"
  const getSingleItemData = async () => {
    console.log(editItem)
    try {
      const params = {
        itemId: editItem
      }
      const request = await axios.get(API_BASE_URL, params);
      
      console.log(request)
      
    } catch(err) {
      console.error(err)
    }
  }
  
  if (editItem) {
    getSingleItemData()
  }
  

  const sendData = async () => {
    try {
      // const API_BASE_URL = 'https://ji1u25w37c.execute-api.us-east-2.amazonaws.com/production/recipe'
      const payload = {
        itemId: `${Math.floor(Math.random() * (999999999 - 0 + 1)) + 999999999}`,
        name: data.name,
        ingredients: data.ingredients,
        directions: data.directions,
        categories: data.categories
      }
      const config = {
        method: 'POST',
        data: payload,
        url: API_BASE_URL
      }  
      const request = await axios(config)
      console.log(request)
      const {Item} = request.data;
      addRecipe(Item)
    } catch(err) {
      console.error(err)
    }
  }

  const handleCategories = (array) => {
    console.log(array)
    setData({...data, categories: array})
  }

  const handleChange = e => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    sendData();
  }

  // addes category (user added) to list of categories in state
  const addNewCategory = newCategory => {
    console.log(newCategory)
    setData({
      ...data, 
      categories: [...data.categories, newCategory]
    })
  }

  // displays an textbox to add a new category 
  let newCategory;
  if (toggleCheck) {
    newCategory = <NewCategory 
    addNewCategory={addNewCategory} 
    />;
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>

      <div className="row">
        <label htmlFor="name">Recipe Name</label>
        <input type="text" name="name" value={data.name} placeholder="recipe name" onChange={handleChange}/>
      </div>
      
      <div className="row">
        <label htmlFor="ingredients">Ingredients and Amount</label>
        <textarea type="text" name="ingredients" value={data.ingredients} placeholder="add ingredients and amount" onChange={handleChange}/>
      </div>

      <div>
        <input name="new" type="checkbox" onChange={() => setToggleCheck(!toggleCheck)}/>
        <label htmlFor="new" className="new-category" >Add New Category</label>
        {newCategory}
      </div>

      <div>
        <Checkbox handleCategories={handleCategories}/>
      </div>

      <div className="row">
        <label htmlFor="directions">Directions</label>
        <textarea type="textarea" name="directions" value={data.directions} placeholder="break directions into steps" onChange={handleChange}/>
      </div>

      <button type="submit">Create Recipe</button>

    </form>
  )
}
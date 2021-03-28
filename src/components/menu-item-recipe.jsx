import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom'; 
import '../styling/menu-item-recipe.css';


export const MenuItemRecipe = ({items, dish, reGrabData}) => {
  const history = useHistory();
  const [redirectEdit, setRedirectEdit] = useState(false);
  const [redirectDelete, setRedirectDelete] = useState(false);
  if (!dish) return <div></div>; // REFRESH ON THIS PAGE LOSES PROPS - set local storage to fix ? 

  const handleEdit = itemId => {
    console.log(itemId)
    setRedirectEdit(!redirectEdit)
  }

  const handleDelete = itemId => {
    deleteData(itemId).then(() => setRedirectDelete(!redirectDelete))
  }

  const deleteData = async (itemId) => {
    try {
      const API_BASE_URL = 'https://ji1u25w37c.execute-api.us-east-2.amazonaws.com/production/recipe'
      const config = {
        method: 'DELETE',
        data: {itemId: itemId},
        url: API_BASE_URL
      }  
      const request = await axios(config)
      console.log(request)   
      reGrabData()         
    } catch(err) {
      console.error(err)
    }
  }

  const item = items.filter((item,i) => item.name === dish)[0];
  const cat = item.categories.map((c,i) => c + " ")
  

  if (redirectEdit) return <Redirect to="/recipe" />;
  if (redirectDelete) return <Redirect to="/menu" />; 
  return (
    <div>
      <div className="menu-item-recipe-wrapper">
        <div>{item.name}</div>
        <div>Categories: {cat}</div>
        <div>Ingredients: {item.ingredients}</div>
        <div>Directions: {item.directions}</div> 
      </div>
      <div>
        <button className="btn" onClick={() => handleEdit(item.itemId)}>Edit Recipe</button>
        <button className="btn" onClick={() => handleDelete(item.itemId)}>Delete Recipe</button>
        <button className="btn" onClick={() => history.goBack()}>Back to Menu</button>
      </div>
    </div>
  )
}
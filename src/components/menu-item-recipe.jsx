import React from 'react';
import { useHistory } from 'react-router-dom'; 
import '../styling/menu-item-recipe.css';


export const MenuItemRecipe = ({items, dish}) => {
  const history = useHistory();

  const item = items.filter((item,i) => item.name === dish)[0];
  const cat = item.categories.map((c,i) => c + " ")

  
  return (
    <div>
      <div className="menu-item-recipe-wrapper">
        <div>{item.name}</div>
        <div>Categories: {cat}</div>
        <div>Ingredients: {item.ingredients}</div>
        <div>Directions: {item.directions}</div> 
      </div>
      <button 
          className="btn"
          onClick={() => history.goBack()}
        >Back to Menu</button>
    </div>
  )
}
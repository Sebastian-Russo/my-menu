import React from 'react';
import { useHistory } from 'react-router-dom'; 
import '../styling/menu-item-recipe.css';


export const MenuItemRecipe = ({items, dish}) => {
  const history = useHistory();
  if (!dish) return <div></div> // REFRESH ON THIS PAGE LOSES PROPS - set local storage to fix ? 

  const handleEdit = itemId => {
    console.log(itemId)
  }

  const handleDelete = itemId => {
    console.log(itemId)
  }

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
      <div>
        <button className="btn" onClick={() => handleEdit(item.itemId)}>Edit Recipe</button>
        <button className="btn" onClick={() => handleDelete(item.itemId)}>Delete Recipe</button>
        <button className="btn" onClick={() => history.goBack()}>Back to Menu</button>
      </div>
    </div>
  )
}
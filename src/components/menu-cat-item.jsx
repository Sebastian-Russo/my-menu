import React from 'react';
import '../styling/menu-cat-item.css';

export const MenuCatItem = ({items}) => {
      
  const item = items.map(item => {
    let cat = item.categories.map((c,i) => c + " ")
    return (
      <div key={item.itemId} className="menu-item-wrapper">
        <div>Recipe: {item.name}</div>
        <div>Categories: {cat}</div>
        <div>Ingredients: {item.ingredients}</div>
        <div>Directions: {item.directions}</div>
      </div>
    )
  })

  return (
    <div>
      {item}
    </div>
  )
}
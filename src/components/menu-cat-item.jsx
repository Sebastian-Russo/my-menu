import React from 'react';
import '../styling/menu-cat-item.css';

export const MenuCatItem = ({items}) => {
    
  const item = items.map(item => {
    return (
      <div key={item.itemId} className="menu-item-wrapper">
        <div>{item.name}</div>
        <div>{item.categories}</div>
        <div>{item.ingredients}</div>
        <div>{item.directions}</div>
      </div>
    )
  })

  return (
    <div>
      {item}
    </div>
  )
}
import React from 'react';
import '../styling/menu-cat-item.css';

export const MenuCatItem = ({item}) => {
    
  return (
    <div className="menu-item-wrapper">
      <div>{item.name}</div>
      <div>{item.categories}</div>
      <div>{item.ingredients}</div>
      <div>{item.directions}</div>
    </div>
  )
}
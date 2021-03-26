import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/menu-item.css';

export const MenuItems = ({items, selectedDish}) => {
      
  const selectedItem = (dish) => {
    selectedDish(dish)
  }

  const item = items.map(item => {
    return (
      <div key={item.itemId} className="menu-item-wrapper">
        <Link to={`/menu/${item.name}`}><div onClick={() => selectedItem(item.name)}>{item.name}</div></Link>
      </div>
    )
  })

  return (
    <div>
      {item}
    </div>
  )
}
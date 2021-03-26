import React, { useState } from 'react';
import { MenuItems } from './menu-item';
import '../styling/menu.css';

export const Menu = ({items, selectedDish}) => {
  const [selected, setSelected] = useState(items);

  // selects category
  const handleClick = (item) => {
    filterItems(item)
  }

  const handleAll = () => {
    setSelected(items)
  }
  
  /************ Sort categores from list of items **************/
  const duplicatesArray = items.map((item,i) => item.categories.map((c,i) => c)).flat();
  const cleanDulpicates = (array) => {
    let seen = {};
    return array.filter((item) => {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true); 
    })
  }
  // removes duplicate category names 
  const cleaned = cleanDulpicates(duplicatesArray);
  const categories = cleaned.map((item,i) => {
    return (
      <div key={i} >
        <div className="cat-wrapper" onClick={() => handleClick(item)}>{item}</div>
      </div>
    )
  })
  /************************ Set selected items by category type selected ***************************/
  const filterItems = (type) => {
    let list = items.filter((item,i) => item.categories.find((item) => item === type));
    setSelected(list)
  }
  /************************************************************************/



  return (
    <div className="category-wrapper">
      <h4>Categories:</h4> 
      <div className="cat-wrapper" onClick={() => handleAll()}>All</div>
      {categories}
      <MenuItems items={selected} selectedDish={selectedDish}/>
    </div>
  )
}
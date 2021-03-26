import React from 'react';
import '../styling/menu-category.css';

export const MenuCategory = ({items}) => {
  
  const duplicatesArray = items.map((item,i) => item.categories.map((c,i) => c)).flat();
  const cleanDulpicates = (array) => {
    let seen = {};
    return array.filter((item) => {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true); 
    })
  }
  const cleaned = cleanDulpicates(duplicatesArray)

  const categories = cleaned.map((item,i) => {
    return (
      <div key={i} >
        <div className="cat-wrapper" onClick={()=>{}}>{item}</div>
      </div>
    )
  })

  return (
    <div className="category-wrapper">
      Categories: 
      {categories}
    </div>
  )
}
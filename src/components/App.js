import React, { useState } from 'react';
// import Navbar from './navbar';
import { RecipeForm } from './recipe-form';
import { MenuCatItem } from './menu-cat-item';
import { MenuCategory } from './menu-category';
import items from '../recipes.json';
import '../styling/App.css';


function App() {
  const [item, setItem] = useState(items);

  console.log(item) 

  const addRecipe = (newItem) => {
    console.log(newItem)
    setItem([...item, newItem])
  }

  return (
    <div className="App">
        {/* <Navbar /> */}
        <RecipeForm addRecipe={addRecipe}/>
        <MenuCategory items={item}/>
        <MenuCatItem items={item}/>
    </div>
  );
}

export default App;

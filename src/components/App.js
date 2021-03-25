import React, { useState } from 'react';
// import Navbar from './navbar';
import { RecipeForm } from './recipe-form';
import { MenuCatItem } from './menu-cat-item';
import '../styling/App.css';

// API endpoint 
// https://ji1u25w37c.execute-api.us-east-2.amazonaws.com/production

function App() {
  const [recipe, setRecipe] = useState({name: "", ingredients: "", directions: "", categories: []})

  console.log(recipe)

  const addRecipe = (val) => {
    setRecipe(val)
  }

  return (
    <div className="App">
        {/* <Navbar /> */}
        <RecipeForm addRecipe={addRecipe}/>
        <MenuCatItem item={recipe}/>
    </div>
  );
}

export default App;

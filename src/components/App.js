import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './navbar';
import { RecipeForm } from './recipe-form';
import { MenuCategory } from './menu-category';
import items from '../recipes.json';
import '../styling/App.css';


function App() {
  const [item, setItem] = useState(items);

  const addRecipe = (newItem) => {
    console.log(newItem)
    setItem([...item, newItem])
  }

  return (
    <Router>
      <div className="App">
          <Navbar />
          <Switch>
            <Route 
              path="/recipe"
              render={props =>
                <RecipeForm {...props}
                addRecipe={addRecipe}/>
              }
            />
            <Route 
              path="/menu"
              render={props =>
                <MenuCategory {...props}
                items={item}/>
              }
            />
          </Switch>
      </div>
    </Router>
  );
}

export default App;

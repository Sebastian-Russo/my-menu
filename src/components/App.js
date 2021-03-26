import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './navbar';
import { RecipeForm } from './form/recipe-form';
import { Menu } from './menu';
import { MenuItemRecipe } from './menu-item-recipe';
import items from '../recipes.json';
import '../styling/App.css';


function App() {
  const [item, setItem] = useState(items);
  const [dish, setDish] = useState("");

  const addRecipe = (newItem) => {
    console.log(newItem)
    setItem([...item, newItem])
  }

  const selectedDish = dish => {
    setDish(dish)
  }

  return (
    <Router>
      <div className="App">
          <Navbar />
          <Switch>
            <Route 
              exact
              path="/menu"
              render={props =>
                <Menu {...props}
                selectedDish={selectedDish}
                items={item}/>
              }
            />
            <Route 
              exact
              path="/menu/:item"
              render={props =>
                <MenuItemRecipe {...props}
                dish={dish}
                items={item}/>
              }
            />
              <Route 
                exact
                path="/recipe"
                render={props =>
                  <RecipeForm {...props}
                  addRecipe={addRecipe}/>
                }
              />
          </Switch>
      </div>
    </Router>
  );
}

export default App;

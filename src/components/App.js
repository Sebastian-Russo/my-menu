import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from './navbar';
import { RecipeForm } from './form/recipe-form';
import { Menu } from './menu';
import { MenuItemRecipe } from './menu-item-recipe';
import items from '../recipes.json';
import '../styling/App.css';


function App() {
  const [item, setItem] = useState(items);
  const [dish, setDish] = useState("");

  useEffect(() => {
    const getData = async () => {
      const API_BASE_URL = 'https://ji1u25w37c.execute-api.us-east-2.amazonaws.com/production/recipes';
      try {
        const config = {
          method: 'GET',
          url: API_BASE_URL
        }
        const request = await axios(config)
        console.log(request)
      } catch(err) {
        console.error(err)
      }
    }
    getData()
  }, [])

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

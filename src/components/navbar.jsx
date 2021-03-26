import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/navbar.css';

export const Navbar = () => {
  return (
    <div>
      <div className="navlink-wrapper">
        <Link to="/recipe">Add Recipe</Link>
        <Link to="/menu">View Menu</Link>
      </div>
    </div>
  )
}


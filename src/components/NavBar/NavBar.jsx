import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/create-user">Create User</NavLink>
      <NavLink to="/user-list">User List</NavLink>
    </nav>
  );
};

export default Navbar;

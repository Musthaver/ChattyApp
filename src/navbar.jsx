import React, { Component } from 'react';

const Navbar = ({ userCount, currentUser }) => {
  return (
    <nav className='navbar'>
      <div>
        <a href='/' className='navbar-brand'>
          Chatty
        </a>
      </div>
      <div>
        <h3>Welcome, {currentUser.name}</h3>
        <h3>{userCount} users online</h3>
      </div>
    </nav>
  );
};
export default Navbar;

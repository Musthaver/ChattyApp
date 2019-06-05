import React, { Component } from 'react';

const Navbar = ({ userCount }) => {
  return (
    <nav className='navbar'>
      <div>
        <a href='/' className='navbar-brand'>
          Chatty
        </a>
      </div>
      <div>
        <h2>{userCount} users online</h2>
      </div>
    </nav>
  );
};
export default Navbar;

import React from 'react';
import './Navbar.css'

const NavBar = ({ children }) => {
  return (
    <nav className='nav-container'>{children}</nav>
  )
}

export default NavBar
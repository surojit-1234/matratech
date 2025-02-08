import React from 'react';
import { NavLink } from 'react-router-dom';
import './sass/Style.css';

const Header = (props) => {
  /*---======When click on particular menu then that page will 
  open and entire menu-items will be closed as well======---*/

  function handleMenuItems() {
    
    if(window.innerWidth<=767) {
      props.onChildData(false);
    }
    //setIsMenuOpen(false); It will be fix later...
  }

  return (
    <nav className={props.isOpen? 'openNav' : 'closeNav'}>
        <ul>
            <li><NavLink className='item' to='/' onClick={handleMenuItems}>Home</NavLink></li>
            <li><NavLink className='item' to='/about' onClick={handleMenuItems}>About</NavLink></li>
            <li><NavLink className='item' to='/service' onClick={handleMenuItems}>Services</NavLink></li>
            <li><NavLink className='item' to='/portfolio' onClick={handleMenuItems}>Portfolio</NavLink></li>
            <li><NavLink className='item' to='/innovation' onClick={handleMenuItems}>Innovation</NavLink></li>
            <li><NavLink className='item' to='/practice' onClick={handleMenuItems}>Practice</NavLink></li>
            <li><NavLink className='item' to='/contact' onClick={handleMenuItems}>Contact</NavLink></li>
        </ul>
    </nav>
  )
}

export default Header;
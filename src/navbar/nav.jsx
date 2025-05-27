import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";

import "./nav.css"

function Nav() {
  return (
    <nav className='nav-bar'>
      <ul className='nav-list'>
        <li><Link className='nav-link-first' to="/">Home</Link></li>
        <li><Link className='nav-link' to="/login">Login</Link></li>
      </ul>
      <div className='nav-search'>
        <input className='nav-search-input' placeholder="Buscar shopping..."/>
        <Link to="/busca">
          <IoIosSearch className='nav-search-icon' />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
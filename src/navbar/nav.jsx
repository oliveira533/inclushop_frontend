import React from 'react';
import ReactDOM from 'react-dom/client';
import { IoIosSearch } from "react-icons/io";

import "./nav.css"

function Nav() {
  return (
    <nav className='nav-bar'>
      <ul className='nav-list'>
        <li><a className='nav-link-first' href="/">Home</a></li>
        <li><a className='nav-link' href="/about">user</a></li>
      </ul>
      <div className='nav-search'><input className='nav-search-input'/><IoIosSearch className='nav-search-icon' /></div>
    </nav>
  );
}

export default Nav;
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul className="navUl">
        <li>
          <Link to="/" className="navLink">Books</Link>
        </li>
        <li>
          <Link to="/categories" className="navLink">Categories</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';

const Header = () => (
  <header>
    <nav>
      <div className="nav-div">
        <h1>Bookstore CMS</h1>
        <ul className="navUl">
          <li>
            <Link to="/" className="navLink">Books</Link>
          </li>
          <li>
            <Link to="/categories" className="navLink">Categories</Link>
          </li>
        </ul>
      </div>
      <div className="circle">
        <BsFillPersonFill className="userIcon" />
      </div>
    </nav>
  </header>
);

export default Header;

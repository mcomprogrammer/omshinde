import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li><Link to="/learn" className="nav-link">Learn</Link></li>
          <li><Link to="/leaderboard" className="nav-link">Leaderboard</Link></li>
          <li><Link to="/videos" className="nav-link">Videos</Link></li>
          <li><Link to="/profile" className="nav-link">Profile</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>
          <li><Link to="/register" className="nav-link">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

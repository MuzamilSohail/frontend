import React from 'react';
import { Link } from 'react-router-dom';
import './styles/theme.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">OxyGym</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
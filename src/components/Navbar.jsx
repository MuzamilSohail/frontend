import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ background: '#333', padding: '1rem' }}>
    <Link to="/users" style={{ color: '#fff', marginRight: '1rem' }}>Users</Link>
  </nav>
);

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/theme.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="title">OXYGYM</h1>
        <p className="subtitle">MOTIVATION IS WHAT GETS YOU STARTED. HABIT IS WHAT KEEPS YOU GOING.</p>
        <Link to="/dashboard">
          <button className="btn btn-join">JOIN US TODAY</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header.jsx';
import Home from './components/pages/Home.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
import './components/styles/theme.css';
import TrainerSignup from './components/TrainerSignup';
import UserSignup from './components/UserSignup';
import HireTrainer from './components/HireTrainer';
import PlanView from './components/PlanView';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
  
          <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home-dashboard" element={<Dashboard userType="" userName="" />} />
          <Route path="/trainer-signup" element={<TrainerSignup />} />
          <Route path="/user-signup" element={<UserSignup />} />
          <Route path="/hire-trainer" element={<HireTrainer />} />
          <Route path="/plans" element={<PlanView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
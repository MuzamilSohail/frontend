import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import TrainerManagement from './components/TrainerManagement';
import CategoryManagement from './components/CategoryManagement';
import SubscriptionManagement from './components/SubscriptionManagement';
import Reports from './components/Reports';
import './styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        {/* Persistent Navbar */}
        <nav className="navbar">
          <div className="logo">
            <span className="logo-icon">≡</span> OxyGym
          </div>
          <div className="nav-links">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">Home</Link>
                <Link to="/users">Users</Link>
                <Link to="/trainers">Trainers</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/subscriptions">Subscriptions</Link>
                <Link to="/reports">Reports</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/dashboard">Home</Link>
                <Link to="/login" className="login-btn">Login</Link>
              </>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/trainers" element={<TrainerManagement />} />
              <Route path="/categories" element={<CategoryManagement />} />
              <Route path="/subscriptions" element={<SubscriptionManagement />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
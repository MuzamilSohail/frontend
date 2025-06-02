import React from 'react';
import '../styles/Dashboard.css';

function Dashboard({ userType, userName }) {
  return (
    <div className="dashboard">
      <h1>Welcome, {userName}!</h1>
      <div className="dashboard-content">
        <h2>{userType === 'trainer' ? 'Trainer Dashboard' : 'User Dashboard'}</h2>
        <div className="dashboard-section">
          <h3>Your Progress</h3>
          <p>Progress tracking coming soon (charts to be added later).</p>
        </div>
        {userType === 'trainer' ? (
          <div className="dashboard-section">
            <h3>Your Clients</h3>
            <p>View and manage your clients here.</p>
            <button className="action-button">View Clients</button>
          </div>
        ) : (
          <div className="dashboard-section">
            <h3>Your Plan</h3>
            <p>Check your meal and workout plans below.</p>
            <button className="action-button">View Plans</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
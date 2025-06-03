import React, { useState } from 'react';
import axios from 'axios';
import RegistrationForm from '../RegistrationForm.jsx';
import GoalSelection from '../GoalSelection.jsx';
import TrainerHire from '../TrainerHire.jsx';
import ProgressUpdate from '../ProgressUpdate.jsx';
import WorkoutPlan from '../WorkoutPlan.jsx';
import DietPlan from '../DietPlan.jsx';
import '../styles/theme.css';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const Dashboard = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">{user ? `Welcome, ${user.name}!` : 'Get Started'}</h2>
      <div className="dashboard-grid">
        {!user ? (
          <div className="dashboard-card">
            <RegistrationForm onRegister={setUser} />
          </div>
        ) : (
          <>
            <div className="dashboard-card">
              <GoalSelection userId={user._id} />
            </div>
            <div className="dashboard-card">
              <TrainerHire userId={user._id} />
            </div>
            <div className="dashboard-card">
              <ProgressUpdate userId={user._id} />
            </div>
            <div className="dashboard-card">
              <WorkoutPlan userId={user._id} />
            </div>
            <div className="dashboard-card">
              <DietPlan userId={user._id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
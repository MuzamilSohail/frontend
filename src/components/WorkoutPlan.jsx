import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/theme.css';

const WorkoutPlan = ({ userId }) => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await axios.get(`http://localhost:5000/api/user/workout-plan/${userId}`);
      setPlan(res.data);
    };
    fetchPlan();
  }, [userId]);

  return (
    <div className="form-container">
      <h2 className="form-title">Your Workout Plan</h2>
      {plan ? (
        <div className="plan-content">
          <p>{plan.schedule}</p>
        </div>
      ) : (
        <p className="plan-empty">No workout plan available.</p>
      )}
    </div>
  );
};

export default WorkoutPlan;
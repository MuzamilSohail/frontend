import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/theme.css';

const DietPlan = ({ userId }) => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await axios.get(`http://localhost:5000/api/user/diet-plan/${userId}`);
      setPlan(res.data);
    };
    fetchPlan();
  }, [userId]);

  return (
    <div className="form-container">
      <h2 className="form-title">Your Diet Plan</h2>
      {plan ? (
        <div className="plan-content">
          <p>{plan.meals}</p>
        </div>
      ) : (
        <p className="plan-empty">No diet plan available.</p>
      )}
    </div>
  );
};

export default DietPlan;
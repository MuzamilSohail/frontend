import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PlanView.css';

const PlanView = () => {
  const [plans, setPlans] = useState({ mealPlan: [], workoutPlan: [] });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('https://api.oxygenfitnessgym.com/plans');
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="plan-view">
      <h2>Your Plans</h2>
      <div className="plan-section">
        <h3>Meal Plan</h3>
        {plans.mealPlan.length > 0 ? (
          <ul>
            {plans.mealPlan.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No meal plan available.</p>
        )}
      </div>
      <div className="plan-section">
        <h3>Workout Plan</h3>
        {plans.workoutPlan.length > 0 ? (
          <ul>
            {plans.workoutPlan.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No workout plan available.</p>
        )}
      </div>
    </div>
  );
};

export default PlanView;
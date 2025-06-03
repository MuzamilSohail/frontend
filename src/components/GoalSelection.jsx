import React, { useState } from 'react';
import axios from 'axios';
import './styles/theme.css';

const GoalSelection = ({ userId }) => {
  const [goals, setGoals] = useState([]);

  const handleGoalChange = (e) => {
    const value = e.target.value;
    setGoals((prev) =>
      prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/goals', { userId, goals });
      alert('Goals updated!');
    } catch (err) {
      console.error(err);
      alert('Failed to update goals!');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Select Your Goals</h2>
      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            value="Muscle Gain"
            onChange={handleGoalChange}
            className="checkbox-input"
          />
          Muscle Gain
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            value="Fat Loss"
            onChange={handleGoalChange}
            className="checkbox-input"
          />
          Fat Loss
        </label>
      </div>
      <button className="btn btn-submit" onClick={handleSubmit}>Save Goals</button>
    </div>
  );
};

export default GoalSelection;
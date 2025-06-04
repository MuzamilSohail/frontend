import React, { useState } from 'react';
import axios from 'axios';
import './styles/theme.css';

const ProgressUpdate = ({ userId }) => {
  const [weight, setWeight] = useState('');
  const [measurements, setMeasurements] = useState({ chest: '', waist: '' });

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/progress', {
        userId,
        progress: { weight, measurements }
      });
      alert('Progress updated!');
    } catch (err) {
      console.error(err);
      alert('Failed to update progress!');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Update Progress</h2>
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="input-field"
      />
      <input
        type="number"
        placeholder="Chest (cm)"
        value={measurements.chest}
        onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
        className="input-field"
      />
      <input
        type="number"
        placeholder="Waist (cm)"
        value={measurements.waist}
        onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
        className="input-field"
      />
      <button className="btn btn-submit" onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default ProgressUpdate;
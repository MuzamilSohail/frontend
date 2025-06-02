import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HireTrainer.css';

const HireTrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('https://api.oxygenfitnessgym.com/trainers');
        setTrainers(response.data);
      } catch (error) {
        setStatus({ error: 'Error fetching trainers. Please try again.' });
      }
    };
    fetchTrainers();
  }, []);

  const handleHire = async (trainerId) => {
    try {
      await axios.post('https://api.oxygenfitnessgym.com/trainers/hire', { trainerId });
      setStatus({ success: 'Trainer hired successfully!' });
    } catch (error) {
      setStatus({ error: 'Error hiring trainer. Please try again.' });
    }
  };

  return (
    <div className="hire-trainer">
      <h2>Hire a Trainer</h2>
      <div className="trainer-list">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="trainer-card">
            <h3>{trainer.name}</h3>
            <p>Category: {trainer.category}</p>
            <p>Fee: ${trainer.fee}/session</p>
            <button className="hire-button" onClick={() => handleHire(trainer.id)}>
              Hire
            </button>
          </div>
        ))}
      </div>
      {status && status.success && <div className="success">{status.success}</div>}
      {status && status.error && <div className="error">{status.error}</div>}
    </div>
  );
};

export default HireTrainer;
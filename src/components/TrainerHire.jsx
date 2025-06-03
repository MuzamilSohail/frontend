import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/theme.css';

const TrainerHire = ({ userId }) => {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');

  useEffect(() => {
    const fetchTrainers = async () => {
      const res = await axios.get('http://localhost:5000/api/trainer/list');
      setTrainers(res.data);
    };
    fetchTrainers();
  }, []);

  const handleHire = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/hire-trainer', { userId, trainerId: selectedTrainer });
      alert('Trainer hired!');
    } catch (err) {
      console.error(err);
      alert('Failed to hire trainer!');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Hire a Trainer</h2>
      <select
        onChange={(e) => setSelectedTrainer(e.target.value)}
        className="input-field select-field"
        value={selectedTrainer}
      >
        <option value="">Select Trainer</option>
        {trainers.map((trainer) => (
          <option key={trainer._id} value={trainer._id}>{trainer.name}</option>
        ))}
      </select>
      <button className="btn btn-submit" onClick={handleHire}>Hire</button>
    </div>
  );
};

export default TrainerHire;
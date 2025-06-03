import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TrainerManagement() {
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState('');
  const [newTrainer, setNewTrainer] = useState({ name: '', email: '', specialization: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/trainers', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setTrainers(res.data));
  }, []);

  const handleCreate = async () => {
    const res = await axios.post('http://localhost:5000/api/trainers', newTrainer, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setTrainers([...trainers, res.data]);
    setNewTrainer({ name: '', email: '', specialization: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/trainers/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setTrainers(trainers.filter(trainer => trainer._id !== id));
  };

  const handleBan = async (id) => {
    await axios.put(`http://localhost:5000/api/trainers/${id}/ban`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setTrainers(trainers.map(trainer => trainer._id === id ? { ...trainer, isBanned: true } : trainer));
  };

  const filteredTrainers = trainers.filter(trainer => 
    trainer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Manage Trainers</h2>
      <input
        className="search-bar"
        type="text"
        placeholder="Search trainers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newTrainer.name}
          onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newTrainer.email}
          onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Specialization"
          value={newTrainer.specialization}
          onChange={(e) => setNewTrainer({ ...newTrainer, specialization: e.target.value })}
        />
        <button onClick={handleCreate}>Add Trainer</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrainers.map(trainer => (
            <tr key={trainer._id}>
              <td>{trainer.name}</td>
              <td>{trainer.email}</td>
              <td>{trainer.specialization}</td>
              <td>{trainer.isBanned ? 'Banned' : 'Active'}</td>
              <td>
                <button onClick={() => handleDelete(trainer._id)}>Delete</button>
                {!trainer.isBanned && <button onClick={() => handleBan(trainer._id)}>Ban</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainerManagement;
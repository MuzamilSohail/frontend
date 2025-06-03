import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({ users: 0, trainers: 0, subscriptions: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports/stats', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setStats(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div>
        <p>Total Users: {stats.users}</p>
        <p>Total Trainers: {stats.trainers}</p>
        <p>Total Subscriptions: {stats.subscriptions}</p>
      </div>
    </div>
  );
}

export default Dashboard;
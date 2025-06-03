import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
  const [userProgress, setUserProgress] = useState([]);
  const [trainerRevenue, setTrainerRevenue] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports/user-progress', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setUserProgress(res.data));

    axios.get('http://localhost:5000/api/reports/trainer-revenue', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setTrainerRevenue(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Reports</h2>
      <h3>User Progress</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {userProgress.map(user => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{JSON.stringify(user.progress)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Trainer Revenue</h3>
      <table>
        <thead>
          <tr>
            <th>Trainer</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(trainerRevenue).map(([trainer, revenue]) => (
            <tr key={trainer}>
              <td>{trainer}</td>
              <td>{revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
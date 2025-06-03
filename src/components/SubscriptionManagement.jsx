import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [newSubscription, setNewSubscription] = useState({ userId: '', trainerId: '', plan: '', amount: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/subscriptions', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setSubscriptions(res.data));
  }, []);

  const handleCreate = async () => {
    const res = await axios.post('http://localhost:5000/api/subscriptions', newSubscription, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setSubscriptions([...subscriptions, res.data]);
    setNewSubscription({ userId: '', trainerId: '', plan: '', amount: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/subscriptions/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setSubscriptions(subscriptions.filter(sub => sub._id !== id));
  };

  return (
    <div className="container">
      <h2>Manage Subscriptions</h2>
      <div>
        <input
          type="text"
          placeholder="User ID"
          value={newSubscription.userId}
          onChange={(e) => setNewSubscription({ ...newSubscription, userId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Trainer ID"
          value={newSubscription.trainerId}
          onChange={(e) => setNewSubscription({ ...newSubscription, trainerId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Plan"
          value={newSubscription.plan}
          onChange={(e) => setNewSubscription({ ...newSubscription, plan: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newSubscription.amount}
          onChange={(e) => setNewSubscription({ ...newSubscription, amount: e.target.value })}
        />
        <button onClick={handleCreate}>Add Subscription</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Trainer</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map(sub => (
            <tr key={sub._id}>
              <td>{sub.userId?.username || 'N/A'}</td>
              <td>{sub.trainerId?.name || 'N/A'}</td>
              <td>{sub.plan}</td>
              <td>{sub.amount}</td>
              <td>
                <button onClick={() => handleDelete(sub._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubscriptionManagement;
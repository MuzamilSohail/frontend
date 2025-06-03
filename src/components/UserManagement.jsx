import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setUsers(res.data));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setUsers(users.filter(user => user._id !== id));
  };

  const handleBan = async (id) => {
    await axios.put(`http://localhost:5000/api/users/${id}/ban`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setUsers(users.map(user => user._id === id ? { ...user, isBanned: true } : user));
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Manage Users</h2>
      <input
        className="search-bar"
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isBanned ? 'Banned' : 'Active'}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
                {!user.isBanned && <button onClick={() => handleBan(user._id)}>Ban</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
import React, { useState } from 'react';
import axios from 'axios';
import dashboard from './Dashboard'

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/static-login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLogin(); // Notify parent component about successful login
      alert('Login successful!');
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <h1>OXYGYM</h1>
        <p className="tagline">Motivation is what gets you started. Habit is what keeps you going.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
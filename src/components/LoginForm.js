// src/components/LoginForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId) {
      const user = { userId };
      localStorage.setItem('currentUser', JSON.stringify(user));
      setUser(user);
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Food Delivery Service</h2>
      <div>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            maxLength={6}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

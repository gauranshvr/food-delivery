import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name && userId) {
      const user = { name, userId };
      localStorage.setItem('currentUser', JSON.stringify(user));
      setUser(user);
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

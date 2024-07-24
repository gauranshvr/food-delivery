// src/components/Logout.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setUser, setOrders, setPendingAmount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setOrders([]);
    setPendingAmount(0);
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

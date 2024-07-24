// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import FoodForm from './components/FoodForm';
import OrderHistory from './components/OrderHistory';
import Logout from './components/Logout';

function App() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [currentOrderTotal, setCurrentOrderTotal] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
      loadUserData(storedUser.userId);
    }
  }, []);

  const loadUserData = (userId) => {
    const storedOrders = JSON.parse(localStorage.getItem(`${userId}-orders`)) || [];
    const storedPendingAmount = parseFloat(localStorage.getItem(`${userId}-pendingAmount`)) || 0;
    setOrders(storedOrders);
    setPendingAmount(storedPendingAmount);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${user.userId}-orders`, JSON.stringify(orders));
      localStorage.setItem(`${user.userId}-pendingAmount`, pendingAmount);
    }
  }, [orders, pendingAmount, user]);

  const addOrder = (order) => {
    const totalOrderPrice = order.items.reduce((total, item) => total + item.price, 0);
    const newOrders = [...orders, order];
    setOrders(newOrders);
    setPendingAmount(pendingAmount + totalOrderPrice);
    setCurrentOrderTotal(totalOrderPrice);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Food Delivery Service</h1>
          {user && <Logout setUser={setUser} setOrders={setOrders} setPendingAmount={setPendingAmount} />}
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<LoginForm setUser={(user) => { setUser(user); loadUserData(user.userId); }} />} />
            {user ? (
              <>
                <Route path="/" element={<FoodForm addOrder={addOrder} user={user} />} />
                <Route path="/history" element={<OrderHistory orders={orders} pendingAmount={pendingAmount} currentOrderTotal={currentOrderTotal} />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

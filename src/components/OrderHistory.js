// src/components/OrderHistory.js

import React from 'react';

const OrderHistory = ({ orders, pendingAmount, currentOrderTotal }) => {
  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p>Order {index + 1}:</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.foodItem} - Quantity: {item.quantity} - Price: ₹{item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <h3>Current Order Total: ₹{currentOrderTotal}</h3>
      <h3>Pending Amount: ₹{pendingAmount}</h3>
    </div>
  );
};

export default OrderHistory;

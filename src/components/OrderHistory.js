// src/components/OrderHistory.js

import React from 'react';

const OrderHistory = ({ orders, pendingAmount, currentOrderTotal }) => {
  return (
    <div>
      {/* <h2 className='text'>ORDER IS BEING READY</h2> */}
      <h2 className='heading'>Order History</h2>
      {orders.length === 0 ? (
        <p id='heading1'>No orders placed yet.</p>
      ) : (
        <table className='order-table'>
          <thead>
            <tr>
              <th>Order No.</th>
              <th>Cabin</th>
              <th>Food Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, orderIndex) => (
              order.items.map((item, itemIndex) => (
                <tr key={`${orderIndex}-${itemIndex}`}>
                  {itemIndex === 0 && (
                    <>
                      <td rowSpan={order.items.length}>Order {orderIndex + 1}</td>
                      <td rowSpan={order.items.length}>{order.cabin}</td>
                    </>
                  )}
                  <td>{item.foodItem}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                </tr>
              ))
            ))}
            <tr>
              <td colSpan="4" className='total-label'>Current Order Total</td>
              <td>₹{currentOrderTotal}</td>
            </tr>
            <tr>
              <td colSpan="4" className='total-label'>Pending Amount</td>
              <td>₹{pendingAmount}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;

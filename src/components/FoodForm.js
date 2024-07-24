import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FoodForm = ({ addOrder }) => {
  const [formData, setFormData] = useState({
    name: '',
    cabin: '',
    items: [{ foodItem: '', quantity: 1 }]
  });
  const navigate = useNavigate();

  const foodItems = [
    { name: 'Pizza', price: 10 },
    { name: 'Patties', price: 25 },
    { name: 'Coffee', price: 18 },
    { name: 'Tea', price: 12 },
    { name: 'Burger', price: 7 },
    { name: 'Salad', price: 5 },
    { name: 'Pasta', price: 8 },
    { name: 'Biscuit', price: 12 }
  ];

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index][name] = value;
    setFormData({ ...formData, items: newItems });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { foodItem: '', quantity: 1 }]
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ordersWithPrices = formData.items.map(item => {
      const selectedFood = foodItems.find(food => food.name === item.foodItem);
      return {
        ...item,
        price: selectedFood ? selectedFood.price * item.quantity : 0
      };
    });
    const totalOrder = { ...formData, items: ordersWithPrices };
    addOrder(totalOrder);
    navigate('/history');
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <div>
        <label>
          Cabin:
          <input
            type="text"
            name="cabin"
            value={formData.cabin}
            onChange={(e) => setFormData({ ...formData, cabin: e.target.value })}
            required
          />
        </label>
      </div>
      {formData.items.map((item, index) => (
        <div key={index}>
          <label>
            Food Item:
            <select
              name="foodItem"
              value={item.foodItem}
              onChange={(e) => handleChange(e, index)}
              required
            >
              <option value="">Select an item</option>
              {foodItems.map((food, idx) => (
                <option key={idx} value={food.name}>
                  {food.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleChange(e, index)}
              min="1"
              required
            />
          </label>
          <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>Add Another Item</button>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default FoodForm;

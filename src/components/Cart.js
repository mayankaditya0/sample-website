import React, { useState } from 'react';
import axios from 'axios';
 
const Cart = (props) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
 
  const placeOrder = () => {
    // Format the props.cart items
const cartItems = props.cart.map((item) => ({
      title: item.productName,
      price: item.productPrice,
    }));
 
    // Notify admin on WhatsApp
axios.post('/api/notify-admin', { cartItems })
      .then(() => {
        setOrderPlaced(true);
      })
      .catch(console.error);
  };
 
  if (orderPlaced) {
    return <h2>Order placed successfully!</h2>;
  }

  console.log('^^^^^^^^',props);
 
  return (
    <div className="props.cart">
      <h1>Your Cart</h1>
      <ul>
{props.cart.map((product, index) => (
          <li key={index}>
            {product.productName} - ${product.productPrice}
          </li>
        ))}
      </ul>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};
 
export default Cart;
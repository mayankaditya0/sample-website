import React, { useState } from 'react';
import axios from 'axios';
 
const Cart = (props) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
 
  const placeOrder = () => {
    // Format the props.cart items
const cartItems = props?.cart?.map((item) => ({
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


 
  return (
    <div style={{width:"100%", color:'white', height: "100vh"}}>
      <h1>Your Cart</h1>
      <ul>
      {props?.cart?.map((product, index) => (
          <li key={index}>
            {product.productName} - ${product.productPrice}
          </li>
        ))}
      </ul>
      <button style={{backgroundColor:'#61dafb', color:'white', height:'30px', width:'100px', marginLeft:'8px', borderRadius:'8px'}}onClick={placeOrder}>Place Order</button>
    </div>
  );
};
 
export default Cart;
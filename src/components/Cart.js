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

console.log('%%%%%%%%%%%%%%%%%', props.cart)
 
  return (
    <div style={{width:"100%", color:'white', height: "100vh"}}>
      <h1>Your Cart</h1>
      <div style={{display:'flex', width:'100%', justifyContent:'space-around'}}>
      {props?.cart?.map((product, index) => (
          <div style={{height:'180px', width:'150px', padding:'5px', border:'2px solid silver', display:'flex', flexDirection:'column', alignItems:'center'}} key={index}>
          <img style={{height: "80px", width:'100px', objectFit:'contain'}}src={product?.productImage?.fields?.file?.url} alt={product?.productName} />
          <div >
            <p>{product.productName}</p>
            <p>RS {product.productPrice}</p>
          </div>
        </div>
        ))}
      </div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'32px', width:'100%'}}>
      <button style={{backgroundColor:'#61dafb', fontSize:'16px',color:'white', height:'60px', width:'200px', marginLeft:'8px', borderRadius:'8px'}}onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
};
 
export default Cart;
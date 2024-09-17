import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
 
import Home from './components/Home';
import Cart from './components/Cart';
 
function App() {
  const [cart, setCart] = useState([]);
 
  const addToCart = (product) => {
    
    setCart([...cart, product]);
  };
 console.log('cart',cart);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </Router>
  );
}
 
export default App;
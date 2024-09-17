import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Cart from './components/Cart';
import About from './components/About';
 
function App() {
  const [cart, setCart] = useState([]);
 
  const addToCart = (product) => {
    
    setCart([...cart, product]);
  };
 console.log('cart',cart);
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Layout><Home addToCart={addToCart} /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/cart" element={<Layout><Cart cart={cart} /></Layout>} />
                {/* <Route path="/signIn" element={<Layout><SignIn /></Layout>} /> */}
                
            </Routes>
        </Router>
  );
}
 
export default App;
import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import '../App.css'; 
const envId = 'dev';
const client = createClient({
  space: 'x6qez2w7sold',
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  environment: envId
});
 
const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    client.getEntries({ content_type: 'product' })
      .then((response) => {
        console.log('res', response.items)
        setProducts(response.items);
      }).catch(console.error);
}, []);
 
return (
  <>
  <div>
    <div className="markque"><marquee>
    <span><b>Today Only:  </b>50% off on every product. <b onClick={() => window.location.href = "/"}>SHOP NOW ▸</b></span>
      </marquee>
    </div>
  <header className="header">
        <div className="logo">
          <img className="logo" src="logo192.png" alt="Company Logo" />
        </div>
        <nav className="nav-buttons">
          <button onClick={() => window.location.href = "/"}>Home</button>
          <button onClick={() => window.location.href = "/about"}>About Us</button>
          <button onClick={() => window.location.href = "/signin"}>Sign In</button>
          <button onClick={() => window.location.href = "/cart"}>Cart</button>
        </nav>
  </header>
  </div>
   <div className="product-list">
    {products.map((product) => (
    <div className="product-tile" key={product.sys.id}>
         <img style={{height:'100%', width:'100%'}}src={product.fields.productImage.fields.file.url} alt={product.fields.title} />
         <h2>{product.fields.productName}</h2>
         <h3>{product.fields.productDescription}</h3>
         <p>RS {product.fields.productPrice}</p>
         <button onClick={() => addToCart(product.fields)}>Add to Cart</button>
    </div>
     ))}
   </div>
   </>
);
}

export default Home;
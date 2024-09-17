import React, { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useSnackbar } from 'notistack';

import '../App.css'; 
const envId = 'dev';
const client = createClient({
  space: 'x6qez2w7sold',
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  environment: envId
});
 
const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    client.getEntries({ content_type: 'product' })
      .then((response) => {
        console.log('res', response.items)
        setProducts(response.items);
      }).catch(console.error);
}, []);
const { enqueueSnackbar } = useSnackbar();
    const addToCartSnack = (product) => {
        enqueueSnackbar(`${product.productName} added to cart!`, { variant: 'success' });
    };
 
return (
  <>
  <SnackbarProvider maxSnack={3}>
  <div>
   <div className="product-list">
    {products.map((product) => (
    <div className="product-tile" key={product.sys.id}>
         <img style={{height:'70%', width:'100%'}}src={product.fields.productImage.fields.file.url} alt={product.fields.title} />
         <h2>{product.fields.productName}</h2>
         <h3>{product.fields.productDescription}</h3>
         <p>RS {product.fields.productPrice}</p>
         <button onClick={() => {addToCart(product.fields); addToCartSnack(product.fields);}}>Add to Cart</button>
    </div>
     ))}
   </div>
   </div>
   </SnackbarProvider>
   </>
);
}

export default Home;
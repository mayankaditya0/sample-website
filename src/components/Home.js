import React, { useEffect, useState, useRef } from 'react';
import { createClient } from 'contentful';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Carusel from './Carusel'; // Ensure the path is correct
import '../App.css'; 

const envId = 'dev';
const client = createClient({
  space: 'x6qez2w7sold',
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  environment: envId
});

const CaruselDisplay = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [comminggSoon, setComingSoon] = useState([]);

  useEffect(() => {
    client.getEntries({ content_type: 'product' })
      .then((response) => {
        console.log('res', response.items);
        setProducts(response.items);
      }).catch(console.error);

    client.getEntries({ content_type: 'comingSoonProduct' })
      .then((response) => {
        console.log('res', response.items);
        setComingSoon(response.items);
      }).catch(console.error);
  }, []);

  const { enqueueSnackbar } = useSnackbar();
  
  const addToCartSnack = (product) => {
    enqueueSnackbar(`${product.productName} added to cart!`, { variant: 'success' });
  };

  return (
    <div>
      <Carusel comminggSoon={comminggSoon} />
      <div className="product-list">
        {products.map((product) => (
          <div className="product-tile" key={product.sys.id}>
            <img style={{ height: '280px', width: '100%', objectFit: 'cover' }} src={product.fields.productImage.fields.file.url} alt={product.fields.title} />
            <h2>{product.fields.productName}</h2>
            <h3>{product.fields.productDescription}</h3>
            <p>RS {product.fields.productPrice}</p>
            <button 
              onClick={(e) => {
                addToCartSnack(product.fields);  
                addToCart(product.fields);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const Home = ({addToCart}) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <CaruselDisplay addToCart={addToCart} />
    </SnackbarProvider>
  );
};

export default Home;

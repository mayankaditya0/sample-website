import React, { useEffect, useState, useRef } from 'react';
import { createClient } from 'contentful';
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
  const [comminggSoon, setComingSoon] = useState([]);
  const carouselInnerRef = useRef(null);

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

  useEffect(() => {
    const carouselInner = carouselInnerRef.current;

    if (!carouselInner) return; // Ensure ref is set

    const cards = carouselInner.querySelectorAll('.card');
    if (cards.length === 0) return; // Avoid error if there are no cards

    let currentIndex = 0;

    const moveCarousel = () => {
      if (cards.length === 0) return; // Avoid error if there are no cards
      currentIndex++;
      if (currentIndex >= cards.length) {
        currentIndex = 0; // Loop back to the start
      }
      const offset = -currentIndex * (cards[0].offsetWidth + 20); // Adjust for margin
      carouselInner.style.transform = `translateX(${offset}px)`;
    };

    const intervalId = setInterval(moveCarousel, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [products]); // Depend on products to ensure it runs after data fetch

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <div>
        <div className="carousel">
            <div className="carousel-inner" ref={carouselInnerRef}>
              {comminggSoon.map((product, index) => (
                <div className="card" key={index}>
                  <img src={product.fields.productImage.fields.file.url} alt={product.fields.productName} />
                  <div className="card-details">
                    {product.fields.productName !=='Coming Soon' &&
                    <>
                    <h2>{product.fields.productName}</h2>
                    <p>RS {product.fields.productPrice}</p>
                    <p>{product.fields.productDescription}</p>
                    </>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="product-list">
            {products.map((product) => (
              <div className="product-tile" key={product.sys.id}>
                <img style={{ height: '280px', width: '100%', objectFit: 'cover' }} src={product.fields.productImage.fields.file.url} alt={product.fields.title} />
                <h2>{product.fields.productName}</h2>
                <h3>{product.fields.productDescription}</h3>
                <p>RS {product.fields.productPrice}</p>
                <button onClick={() => { addToCart(product.fields); addToCartSnack(product.fields); }}>Add to Cart</button>
              </div>
            ))}
          </div>
          
        </div>
      </SnackbarProvider>
    </>
  );
}

export default Home;

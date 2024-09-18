import React, { useEffect, useRef, useState } from 'react';
import './Carusel.css';

const Carousel = ({ comminggSoon }) => {
    const carouselInnerRef = useRef(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (comminggSoon.length > 0) {
            // Clone the first card and append to the end
            const clonedCards = [...comminggSoon, comminggSoon[0]];
            setCards(clonedCards);
        }
    }, [comminggSoon]);

    useEffect(() => {
        const carouselInner = carouselInnerRef.current;
        let currentIndex = 0;

        const moveCarousel = () => {
            currentIndex++;
            if (currentIndex >= cards.length) {
                currentIndex = 1; // Jump to the first cloned card
                carouselInner.style.transition = 'none'; // Disable transition for instant jump
                carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Force a reflow to reset transition
                // carouselInner.offsetHeight; // Trigger reflow

                carouselInner.style.transition = 'transform 0.5s ease'; // Re-enable transition
            }
            const offset = -currentIndex * 100; // Move based on percentage
            carouselInner.style.transform = `translateX(${offset}%)`;
        };

        const intervalId = setInterval(moveCarousel, 3000);

        return () => clearInterval(intervalId);
    }, [cards]);

    return (
        <div className="carousel">
            <div className="carousel-inner" ref={carouselInnerRef}>
                {cards.map((product, index) => (
                    <div className="card" key={index}>
                        <img src={product.fields.productImage.fields.file.url} alt={product.fields.productName} />
                        <div className="card-details">
                            {product.fields.productName !== 'Coming Soon' && (
                                <>
                                    <h2>{product.fields.productName}</h2>
                                    <p>RS {product.fields.productPrice}</p>
                                    <p>{product.fields.productDescription}</p>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;

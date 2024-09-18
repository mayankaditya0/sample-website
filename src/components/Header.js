import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faShoppingCart, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Optional: add your CSS file for styling

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="logo">
                <img className="logo" src="logo192.png" alt="Company Logo" />
            </div>
            <nav className="nav-icons">
                <div onClick={() => navigate('/')} className="nav-icon">
                    <FontAwesomeIcon icon={faHome} />
                    <span>Home</span>
                </div>
                <div onClick={() => navigate('/about')} className="nav-icon">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <span>About</span>
                </div>
                <div onClick={() => navigate('/cart')} className="nav-icon">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>Cart</span>
                </div>
                <div onClick={() => navigate('/signIn')} className="nav-icon">
                    <FontAwesomeIcon icon={faSignInAlt} />
                    <span>Sign In</span>
                </div>
            </nav>
        </header>
    );
}

export default Header;

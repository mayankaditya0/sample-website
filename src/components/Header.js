import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="logo">
                <img className="logo" src="logo192.png" alt="Company Logo" />
            </div>
            <nav className="nav-buttons">
                <button onClick={() => navigate('/')}>Home</button>
                <button onClick={() => navigate('/about')}>About</button>
                <button onClick={() => navigate('/cart')}>Cart</button>
                <button onClick={() => navigate('/signIn')}>Sign In</button>
            </nav>
        </header>
    );
}

export default Header;
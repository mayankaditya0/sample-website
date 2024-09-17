import React from 'react';
import Header from './Header';

function Layout({ children }) {
    return (
        <div>
            <Header />
            <main className='home'>
                {children}
            </main>
        </div>
    );
}

export default Layout;
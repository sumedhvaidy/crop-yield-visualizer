import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__logo">Yield The Visualizer</div>
            <ul className="navbar__links">
                <li><a href="#">Home</a></li>
                
            </ul>
        </nav>
    );
}

export default Navbar;

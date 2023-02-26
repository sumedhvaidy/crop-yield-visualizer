import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__logo">Yield The Visualizer</div>
            <ul className="navbar__links">
            <li className><a href="https://github.com/sumedhvaidy/crop-yield-visualizer">GITHUB</a></li>
            <li><a href="#">ABOUT</a></li>
                
                
            </ul>
        </nav>
    );
}

export default Navbar;

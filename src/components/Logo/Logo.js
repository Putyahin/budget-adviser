import React from 'react';
import img from './Logo.png';
import './Logo.css';


const Logo = () => {

    return (
        <span className = "logo navbar-brand">
            <img src={img} />
            Budget Adviser
        </span>
    );
};

export default Logo;

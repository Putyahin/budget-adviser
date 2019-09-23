import React, {Component} from 'react';
import img from './Logo.png';
import './logo.css';

export default class Logo extends Component {

    render() {

        return (
            <span className = "logo navbar-brand">
                <img src={img} />
                Budget Adviser
            </span>
        );
    }
}
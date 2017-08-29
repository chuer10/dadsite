import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavigationBar extends Component {
    render() {
        return (
            <nav className="navbar">
                    <ul className="nav nav-pills">
                        <li className="nav-item nav-link"><Link to="/" >Home</Link></li>
                        <li className="nav-item nav-link"><Link to="/articles">Articles</Link></li>
                        <li className="nav-item nav-link"><Link to="/about">About</Link></li>
                    </ul>
            </nav>
        );
    }
}

export default NavigationBar;

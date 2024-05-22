/* eslint-disable no-unused-vars */
import React from 'react';
import './navbar.css';
import { Logo } from '../Logo';
//import logo from 'path/to/logo.png'; // Asegúrate de actualizar la ruta del logo
//import userIcon from 'path/to/user-icon.png'; // Asegúrate de actualizar la ruta del icono de usuario

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                <Logo />
                    
                </div>
                <div className="nav-links">
                    <a href="#home" className="nav-link"><i className="icon">🏠</i> Home</a>
                    <a href="#about" className="nav-link"><i className="icon">ℹ️</i> About</a>
                    <a href="#services" className="nav-link"><i className="icon">💼</i> Services</a>
                    <a href="#contact" className="nav-link"><i className="icon">📞</i> Contact</a>
                </div>
                <div className="user-profile">
                    <span className="eventos-text">Eventos</span>
                    
                </div>
            </div>
        </nav>
    );
};


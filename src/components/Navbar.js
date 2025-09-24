// src/components/Navbar.js

import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Navbar.css';

// Importamos a imagem do logótipo a partir da pasta assets
import logoImage from '../assets/logo.webp';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const navbarRef = useRef(null);

    useLayoutEffect(() => {
        const navEl = navbarRef.current;

        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: { className: 'navbar--scrolled', targets: navEl }
        });

        const lightSections = gsap.utils.toArray('[data-theme="light"]');
        
        lightSections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: "top 80px",
                end: "bottom 80px",
                toggleClass: { className: 'navbar--light-theme', targets: navEl }
            });
        });

        console.log('Navbar adaptativa inicializada.');

    }, []);

    return (
        <nav className="navbar" ref={navbarRef}>
            <div className="navbar-container">
                {/* O logo em texto foi substituído pela imagem importada */}
                <Link to="/" className="navbar-logo">
                    <img src={logoImage} alt="Logótipo da Construction Investment Group" />
                </Link>

                <ul className="nav-menu">
                    <li className="nav-item"><Link to="/" className="nav-links">Início</Link></li>
                    <li className="nav-item"><Link to="/oportunidades" className="nav-links">Projetos</Link></li>
                    <li className="nav-item"><Link to="/register" className="nav-links nav-link-button">Seja Parceiro</Link></li>
                    <li className="nav-item"><Link to="/login" className="nav-links">Login</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
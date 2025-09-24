// src/components/Navbar.js

import React, { useState, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para o menu
import './Navbar.css';

import logoImage from '../assets/logo.webp';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    // NOVO: Estado para controlar a abertura do menu móvel
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef(null);

    // Funções para controlar o menu
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMobileMenu = () => setIsMenuOpen(false);

    useLayoutEffect(() => {
        const navEl = navbarRef.current;
        // ... (a lógica do GSAP/ScrollTrigger permanece a mesma)
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
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    <img src={logoImage} alt="Logótipo da Construction Investment Group" />
                </Link>

                {/* NOVO: Ícone do menu que só aparece em ecrãs pequenos */}
                <div className="menu-icon" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>

                {/* A classe 'active' será adicionada/removida com base no estado */}
                <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={closeMobileMenu}>Início</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/oportunidades" className="nav-links" onClick={closeMobileMenu}>Projetos</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-links" onClick={closeMobileMenu}>Login</Link>
                    </li>
                    {/* O botão "Seja Parceiro" agora é um item de lista para melhor responsividade */}
                    <li className="nav-item-mobile-button">
                        <Link to="/register" className="nav-links nav-link-button" onClick={closeMobileMenu}>Seja Parceiro</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
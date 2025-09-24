// src/components/Navbar.js
import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const navbarRef = useRef(null);

    useLayoutEffect(() => {
        const navEl = navbarRef.current;

        // Animação base: torna a navbar sólida após sair do Hero
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: { className: 'navbar--scrolled', targets: navEl }
        });

        // Lógica para o tema claro
        const lightSections = gsap.utils.toArray('[data-theme="light"]');
        
        lightSections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: "top 80px", // Quando o topo da secção atinge o fundo da navbar
                end: "bottom 80px", // Quando o fundo da secção atinge o fundo da navbar
                toggleClass: { className: 'navbar--light-theme', targets: navEl }
            });
        });

        console.log('Navbar adaptativa inicializada.');

    }, []);

    return (
        <nav className="navbar" ref={navbarRef}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">CIG</Link>
                <ul className="nav-menu">
                    <li className="nav-item"><Link to="/" className="nav-links">Início</Link></li>
                    <li className="nav-item"><Link to="/oportunidades" className="nav-links">Oportunidades</Link></li>
                    <li className="nav-item"><Link to="/contacto" className="nav-links">Contacto</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
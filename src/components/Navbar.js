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
        // Animação para mudar o fundo da navbar ao rolar
        const showNav = gsap.fromTo(navbarRef.current, {
            backgroundColor: 'transparent'
        }, {
            backgroundColor: 'rgba(10, 10, 10, 0.7)',
            backdropFilter: 'blur(10px)',
            duration: 0.5,
            ease: 'none'
        }).pause(); // Pausamos a animação para que o ScrollTrigger a controle

        ScrollTrigger.create({
            trigger: 'body',
            start: 'top -100', // Quando o scroll passar de 100px
            end: 99999,
            onUpdate: self => {
                self.direction === -1 ? showNav.reverse() : showNav.play(); // Mostra ao descer, esconde ao subir (efeito moderno)
            },
            onEnter: () => showNav.play(),
            onLeaveBack: () => showNav.reverse()
        });
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
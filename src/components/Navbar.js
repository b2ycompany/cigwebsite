// src/components/Navbar.js

import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

// CAMINHOS CORRIGIDOS AQUI (../ em vez de ../../)
import { useAuth } from '../hooks/useAuth';
import { signOutUser } from '../firebaseAuth';
import logoImage from '../assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef(null);
    const { user, userRole } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMobileMenu = () => setIsMenuOpen(false);

    const handleLogout = async () => {
        closeMobileMenu();
        await signOutUser();
        navigate('/');
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    useLayoutEffect(() => {
        const navEl = navbarRef.current;
        
        const st = ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            toggleClass: { className: 'navbar--scrolled', targets: navEl }
        });

        const lightSections = gsap.utils.toArray('[data-theme="light"]');
        
        const st2 = lightSections.map(section => {
            return ScrollTrigger.create({
                trigger: section,
                start: "top 80px",
                end: "bottom 80px",
                toggleClass: { className: 'navbar--light-theme', targets: navEl }
            });
        });

        console.log('Navbar adaptativa inicializada.');

        return () => {
            st.kill();
            st2.forEach(trigger => trigger.kill());
        };
    }, []);

    const navbarClasses = `navbar ${isMenuOpen ? 'navbar--menu-open' : ''}`;

    return (
        <nav className={navbarClasses} ref={navbarRef}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    <img src={logoImage} alt="Logótipo da Construction Investment Group" />
                </Link>

                <button className="menu-icon" onClick={toggleMenu} aria-label="Menu">
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={closeMobileMenu}>Início</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/oportunidades" className="nav-links" onClick={closeMobileMenu}>Projetos</Link>
                    </li>
                    
                    {user ? (
                        <>
                            <li className="nav-item">
                                <Link to={userRole === 'admin' ? '/admin' : '/dashboard'} className="nav-links" onClick={closeMobileMenu}>Meu Painel</Link>
                            </li>
                            <li className="nav-item-mobile-button">
                                <button className="nav-links nav-link-button" onClick={handleLogout}>Sair</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-links" onClick={closeMobileMenu}>Login</Link>
                            </li>
                            <li className="nav-item-mobile-button">
                                <Link to="/register" className="nav-links nav-link-button" onClick={closeMobileMenu}>Seja Parceiro</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
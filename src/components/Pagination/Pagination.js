// src/components/Pagination/Pagination.js

import React, { useLayoutEffect } from 'react'; // Adicionado para corrigir 'useLayoutEffect is not defined'
import { gsap } from 'gsap';                      // Adicionado para corrigir 'gsap is not defined'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';  // Adicionado para corrigir 'ScrollTrigger is not defined'
import './Pagination.css';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Pagination = ({ scenes }) => {
    
    useLayoutEffect(() => {
        const dots = gsap.utils.toArray('.dot');
        scenes.forEach((sceneId, i) => {
            ScrollTrigger.create({
                trigger: sceneId,
                start: "top center",
                end: "bottom center",
                toggleClass: { targets: dots[i], className: "active" }
            });
        });
    }, [scenes]);

    const scrollToScene = (target) => {
        gsap.to(window, {
            scrollTo: { y: target, autoKill: false },
            duration: 1.5,
            ease: 'power3.inOut'
        });
    };

    return (
        <nav className="pagination">
            <ul>
                {scenes.map((sceneId, i) => (
                    <li key={i} className="dot" onClick={() => scrollToScene(sceneId)}></li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
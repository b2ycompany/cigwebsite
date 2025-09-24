// src/components/scenes/StatsScene.js
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from 'react-countup';
import './StatsScene.css';

gsap.registerPlugin(ScrollTrigger);

const StatsScene = () => {
    const component = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".stat-item, .stats-title > *", { // Target mais específico
                scrollTrigger: {
                    trigger: component.current,
                    start: "top 70%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 1,
                ease: 'power3.out'
            });
            console.log('GSAP Cena de Estatísticas inicializada.');
        }, component);
        return () => ctx.revert();
    }, []);
    
    return (
        <section id="stats-scene" className="scene stats-scene" ref={component}>
            <div className="stats-title">
                <h2>Resultados que Constroem Legados</h2>
                <p>Nossa performance é a base da confiança que os investidores depositam em nós.</p>
            </div>
            <div className="stats-grid">
                <div className="stat-item">
                    {/* Usamos o componente CountUp para animar os números */}
                    <h3>+<CountUp end={15} duration={3} enableScrollSpy scrollSpyOnce /></h3>
                    <p>Anos de Experiência Consolidada</p>
                </div>
                <div className="stat-item">
                    <h3>$<CountUp end={80} duration={3} enableScrollSpy scrollSpyOnce />M</h3>
                    <p>Em Ativos Sob Gestão (AUM)</p>
                </div>
                <div className="stat-item">
                    <h3>+<CountUp end={1200} duration={3} separator="." enableScrollSpy scrollSpyOnce /></h3>
                    <p>Unidades Entregues com Sucesso</p>
                </div>
            </div>
        </section>
    );
};

export default StatsScene;
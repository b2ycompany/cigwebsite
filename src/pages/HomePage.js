// src/pages/HomePage.js

import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChartLine, FaHandshake, FaLightbulb } from 'react-icons/fa';
import './HomePage.css';

// CAMINHO E NOME DO FICHEIRO CORRIGIDOS
import heroImage from '../assets/logo.png';
import heroVideo from '../assets/hero-video.mp4';


gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
    const mainRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.animated-section');
            sections.forEach(section => {
                gsap.from(section, {
                    opacity: 0,
                    y: 100,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });
            });
            console.log('Animações de entrada para secções configuradas.');
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="homepage-container" ref={mainRef}>
            <section className="hero-section" data-theme="dark">
                <div className="video-background">
                    <video src={heroVideo} autoPlay loop muted playsInline />
                </div>
                <div className="hero-content">
                    <img src={heroImage} alt="Logótipo da CIG" className="hero-logo" />
                    <h1>Construindo o futuro, um terreno de cada vez.</h1>
                    <p className="hero-tagline">Oportunidades de investimento em terrenos com alto potencial de valorização.</p>
                    <div className="hero-actions">
                        <Link to="/oportunidades" className="btn btn-primary">Ver Projetos</Link>
                        <Link to="/register" className="btn btn-secondary">Seja Parceiro</Link>
                    </div>
                </div>
            </section>

            <div className="animated-section">
                <section className="about-us-section section-padding" data-theme="dark">
                    <div className="container">
                        <span className="section-subtitle">QUEM SOMOS</span>
                        <h2 className="section-title">Investimento Inteligente em Ativos Imobiliários</h2>
                        <p>A CIG é um grupo de investimento especializado no desenvolvimento de empreendimentos imobiliários, focada na aquisição de terrenos para loteamentos e incorporações. Nosso objetivo é proporcionar aos nossos parceiros e investidores as melhores oportunidades do mercado, sempre com foco em segurança, transparência e alta rentabilidade.</p>
                    </div>
                </section>
            </div>

            <div className="animated-section">
                <section className="values-section section-padding" data-theme="light">
                    <div className="container">
                        <h2>Nossos Diferenciais</h2>
                        <div className="values-grid">
                            <div className="value-item">
                                <FaChartLine className="value-icon" />
                                <h3>Rentabilidade</h3>
                                <p>Análise de mercado aprofundada para identificar ativos com alto potencial de valorização.</p>
                            </div>
                            <div className="value-item">
                                <FaHandshake className="value-icon" />
                                <h3>Transparência</h3>
                                <p>Processos claros e comunicação aberta em todas as fases do investimento.</p>
                            </div>
                            <div className="value-item">
                                <FaLightbulb className="value-icon" />
                                <h3>Inovação</h3>
                                <p>Estruturamos negócios imobiliários de forma criativa para maximizar os retornos.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="animated-section">
                <section className="cta-section" data-theme="dark">
                    <div className="container">
                        <h2>Pronto para Construir o Seu Futuro?</h2>
                        <p>Junte-se à nossa rede de parceiros e tenha acesso a oportunidades de investimento exclusivas.</p>
                        <Link to="/register" className="btn btn-primary">Registar Agora</Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
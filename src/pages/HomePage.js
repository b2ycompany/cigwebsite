// src/pages/HomePage.js

import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChartLine, FaHandshake, FaLightbulb } from 'react-icons/fa';
import './HomePage.css';

// Usando o logótipo e o vídeo corretos da sua pasta 'assets'
import heroImage from '../assets/lion-broker-logo-transparent.png';
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
            {/* Secção Hero agora com o VÍDEO de fundo */}
            <section className="hero-section" data-theme="dark">
                <div className="video-background">
                    <video src={heroVideo} autoPlay loop muted playsInline />
                </div>
                <div className="hero-content">
                    <img src={heroImage} alt="Lion Broker Investment Logo" className="hero-logo" />
                    <h1>Investimento Imobiliário Simplificado</h1>
                    <p className="hero-tagline">Conectamos você às melhores oportunidades de investimento no mercado imobiliário, com segurança e rentabilidade.</p>
                    <div className="hero-actions">
                        <Link to="/oportunidades" className="btn btn-primary">Ver Oportunidades</Link>
                        <Link to="/register" className="btn btn-secondary">Seja Parceiro</Link>
                    </div>
                </div>
            </section>

            <div className="animated-section">
                <section className="about-us-section section-padding" data-theme="dark">
                    <div className="container">
                        <h2>Quem Somos</h2>
                        <p>A **Lion Broker Investment** é a ponte entre investidores visionários e projetos imobiliários de alto potencial. Com uma equipa experiente e uma análise de mercado rigorosa, garantimos que cada oportunidade listada na nossa plataforma foi cuidadosamente avaliada para oferecer o máximo retorno e segurança.</p>
                        <p>Acreditamos na democratização do investimento imobiliário, tornando-o acessível e transparente para todos os nossos parceiros e clientes.</p>
                    </div>
                </section>
            </div>

            <div className="animated-section">
                <section className="values-section section-padding" data-theme="light">
                    <div className="container">
                        <h2>Porquê Escolher a Lion Broker?</h2>
                        <div className="values-grid">
                            <div className="value-item">
                                <FaChartLine className="value-icon" />
                                <h3>Rentabilidade Comprovada</h3>
                                <p>Projetos selecionados para garantir um retorno atrativo sobre o seu investimento.</p>
                            </div>
                            <div className="value-item">
                                <FaHandshake className="value-icon" />
                                <h3>Parceria e Transparência</h3>
                                <p>Construímos relações de confiança com base na clareza e no suporte contínuo.</p>
                            </div>
                            <div className="value-item">
                                <FaLightbulb className="value-icon" />
                                <h3>Inovação e Tecnologia</h3>
                                <p>Utilizamos tecnologia de ponta para otimizar a sua experiência de investimento.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="animated-section">
                <section className="cta-section" data-theme="dark">
                    <div className="container">
                        <h2>Pronto para Investir no Seu Futuro?</h2>
                        <p>Junte-se à nossa rede de investidores e parceiros e comece a construir o seu património hoje.</p>
                        <Link to="/register" className="btn btn-primary">Registar Agora</Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
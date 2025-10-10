// src/pages/HomePage.js

import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChartLine, FaHandshake, FaLightbulb } from 'react-icons/fa'; // Ícones para as novas secções
import './HomePage.css';

// ATUALIZADO: Logótipo transparente para a homepage
import heroImage from '../assets/lion-broker-logo-transparent.png';
import SectionBackground from '../assets/hero-bg.webp'; // Um fundo genérico, se tiver um melhor, use-o

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
    const sectionsRef = useRef([]);
    sectionsRef.current = [];

    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    useLayoutEffect(() => {
        console.log('Animações de entrada para secções configuradas.');
        sectionsRef.current.forEach((section, index) => {
            gsap.fromTo(section, 
                { opacity: 0, y: 50 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%", // Começa a animação quando o topo da secção entra em 80% da viewport
                        end: "bottom center",
                        toggleActions: "play none none reverse", // Play on enter, reverse on leave
                        // markers: true, // Para debug
                    }
                }
            );
        });
    }, []);

    return (
        <div className="homepage-container">
            {/* Secção Hero (Primeira dobra) */}
            <section className="hero-section" style={{ backgroundImage: `url(${SectionBackground})` }} data-theme="dark">
                <div className="hero-content" ref={addToRefs}>
                    <img src={heroImage} alt="Lion Broker Investment Logo" className="hero-logo" />
                    <h1>Investimento Imobiliário Simplificado</h1>
                    <p className="hero-tagline">Conectamos você às melhores oportunidades de investimento no mercado imobiliário, com segurança e rentabilidade.</p>
                    <div className="hero-actions">
                        <Link to="/oportunidades" className="btn btn-primary">Ver Oportunidades</Link>
                        <Link to="/register" className="btn btn-secondary">Seja Parceiro</Link>
                    </div>
                </div>
            </section>

            {/* Secção Sobre Nós (Com um texto introdutório) */}
            <section className="about-us-section section-padding" data-theme="dark">
                <div className="container" ref={addToRefs}>
                    <h2>Quem Somos</h2>
                    <p>A **Lion Broker Investment** é a ponte entre investidores visionários e projetos imobiliários de alto potencial. Com uma equipa experiente e uma análise de mercado rigorosa, garantimos que cada oportunidade listada na nossa plataforma foi cuidadosamente avaliada para oferecer o máximo retorno e segurança.</p>
                    <p>Acreditamos na democratização do investimento imobiliário, tornando-o acessível e transparente para todos os nossos parceiros e clientes.</p>
                </div>
            </section>

            {/* Secção Nossos Valores/Diferenciais */}
            <section className="values-section section-padding" data-theme="light"> {/* Exemplo de tema claro */}
                <div className="container" ref={addToRefs}>
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

            {/* Secção CTA - Chamada para Ação */}
            <section className="cta-section" data-theme="dark">
                <div className="container" ref={addToRefs}>
                    <h2>Pronto para Investir no Seu Futuro?</h2>
                    <p>Junte-se à nossa rede de investidores e parceiros e comece a construir o seu património hoje.</p>
                    <Link to="/register" className="btn btn-primary">Registar Agora</Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
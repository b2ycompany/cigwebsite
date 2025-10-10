// src/pages/HomePage.js
import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HomePage.css';

// Importando as secções que compõem a página
import AboutSection from '../components/AboutSection/AboutSection';
import ProjectsCarousel from '../components/ProjectsCarousel/ProjectsCarousel';
import StatsScene from '../components/scenes/StatsScene';
import heroVideo from '../assets/hero-video.mp4';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animação de entrada para cada secção
      const sections = gsap.utils.toArray('.animated-section');
      sections.forEach(section => {
        gsap.from(section, {
          opacity: 0,
          y: 100,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Animação de entrada para o conteúdo do Hero
      gsap.from(".hero-content > *", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        delay: 0.5,
        ease: 'power3.out'
      });

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef}>
      {/* --- Secção Hero --- */}
      <section className="hero-section" data-theme="dark">
        <div className="video-background">
            <video src={heroVideo} autoPlay loop muted playsInline />
        </div>
        <div className="hero-content">
            <h1>A Vanguarda do Investimento Imobiliário</h1>
            <p className="hero-tagline">Oportunidades de alto potencial, estruturadas com inteligência de mercado para investidores e parceiros de elite.</p>
            <div className="hero-actions">
                <Link to="/oportunidades" className="btn btn-primary">Explorar Projetos</Link>
                <Link to="/register" className="btn btn-secondary">Tornar-se Parceiro</Link>
            </div>
        </div>
      </section>
      
      {/* --- Secção Sobre --- */}
      <div className="animated-section">
        <AboutSection />
      </div>
      
      {/* --- Secção Carrossel 3D --- */}
      <div className="animated-section">
        <ProjectsCarousel />
      </div>

      {/* --- Secção de Indicadores --- */}
      <div className="animated-section">
        <StatsScene />
      </div>
    </div>
  );
};
export default HomePage;
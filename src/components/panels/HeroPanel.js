// src/components/panels/HeroPanel.js
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import heroVideo from '../../assets/hero-video.mp4';

const HeroPanel = () => {
  const contentRef = useRef(null);

  // ESTA É A CORREÇÃO: Animação que corre no carregamento, independente do scroll
  useLayoutEffect(() => {
    gsap.from(contentRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        delay: 0.5, // Pequeno atraso para uma entrada suave
        ease: 'power3.out'
    });
  }, []);

  return (
    <div className="panel hero-panel">
      <video className="panel-video" src={heroVideo} autoPlay loop muted />
      <div className="panel-content" ref={contentRef}>
        <h1>O Futuro é um Espaço que Construímos Hoje.</h1>
        <p className="scroll-indicator">Role para iniciar a jornada &rarr;</p>
      </div>
    </div>
  );
};

export default HeroPanel;
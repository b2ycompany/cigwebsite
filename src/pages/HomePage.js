// src/pages/HomePage.js
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroScene from '../components/scenes/HeroScene';
import AboutSection from '../components/AboutSection/AboutSection';
import ProjectsCarousel from '../components/ProjectsCarousel/ProjectsCarousel';
import StatsScene from '../components/scenes/StatsScene'; // Secção de estatísticas reintroduzida

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animação genérica para "montar" cada secção ao aparecer
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
    <div ref={mainRef}>
      <HeroScene />
      
      <div className="animated-section">
        <AboutSection />
      </div>

      <div className="animated-section">
        <ProjectsCarousel />
      </div>

      <div className="animated-section">
        <StatsScene />
      </div>
    </div>
  );
};

export default HomePage;
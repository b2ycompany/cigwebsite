// src/components/HeroSection/HeroSection.js
import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';
// Importa um vídeo. Podes usar um da tua pasta /assets ou um link externo.
import heroVideo from '../../assets/hero-video.mp4'; // Vê a nota abaixo

const HeroSection = () => {
  return (
    <div className='hero-container'>
      <video src={heroVideo} autoPlay loop muted />
      <div className='hero-overlay'></div>
      <div className='hero-content'>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Investimento Imobiliário com Visão de Futuro
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Oportunidades exclusivas em terrenos, construção e imóveis de alto padrão.
        </motion.p>
      </div>
    </div>
  );
};

export default HeroSection;
// src/components/scenes/HeroScene.js
import React from 'react';
import heroVideo from '../../assets/hero-video.mp4';
import './HeroScene.css'; // Importa o CSS dedicado

const HeroScene = () => {
  return (
    <section className="scene hero-scene">
      <div className="video-background">
        <video src={heroVideo} autoPlay loop muted playsInline />
      </div>
      <div className="hero-content">
        <h1>Onde Visão e Valor se Tornam Legado.</h1>
        <p>A CIG redefine o investimento imobiliário, transformando localizações estratégicas em ativos de performance superior e valor duradouro.</p>
      </div>
    </section>
  );
};

export default HeroScene;
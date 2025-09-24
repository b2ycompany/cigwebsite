// src/components/scenes/HeroScene.js
import React from 'react';
import heroVideo from '../../assets/hero-video.mp4';
import './HeroScene.css';

const HeroScene = () => {
  return (
    <section className="scene hero-scene">
      <div className="video-background">
        <video src={heroVideo} autoPlay loop muted playsInline />
      </div>
      <div className="hero-content">
        <h1>Construindo o futuro, um terreno de cada vez.</h1>
        <p>Oportunidades de investimento em terrenos com alto potencial de valorização.</p>
      </div>
    </section>
  );
};
export default HeroScene;
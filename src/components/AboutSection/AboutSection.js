// src/components/AboutSection.js
import React from 'react';
import './AboutSection.css'; // Vamos criar este CSS

const AboutSection = () => {
    return (
        <div className="about-section-container">
            <div className="about-content">
                <span className="section-subtitle">Nossa Filosofia</span>
                <h2 className="section-title">Inteligência de Mercado, Execução de Excelência.</h2>
                <p>A CIG opera na interseção entre a análise de dados aprofundada e uma execução imobiliária impecável. Identificamos oportunidades de alto potencial antes do mercado, estruturando investimentos que não apenas geram retornos excecionais, mas que também valorizam e transformam as comunidades onde atuamos. Cada projeto é um testemunho do nosso compromisso com a qualidade, a inovação e a criação de valor sustentável.</p>
            </div>
        </div>
    );
};
export default AboutSection;
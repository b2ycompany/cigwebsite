// src/components/panels/AboutPanel.js
import React from 'react';
import aboutImage from '../../assets/about-image.jpg';

const AboutPanel = () => {
  return (
    <div className="panel text-panel">
      <div className="panel-image" style={{backgroundImage: `url(${aboutImage})`}}></div>
      <div className="panel-content text-content-wrapper">
        <h2>Não Apenas Construímos. Criamos Valor Perpétuo.</h2>
        <p>A CIG é uma gestora de investimentos focada em originar e desenvolver os ativos imobiliários mais promissores. Nossa tese é simples: localização estratégica, design icónico e execução impecável.</p>
      </div>
    </div>
  );
};

export default AboutPanel;
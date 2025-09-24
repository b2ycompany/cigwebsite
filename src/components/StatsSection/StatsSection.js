// src/components/StatsSection/StatsSection.js

import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './StatsSection.css';

const StatItem = ({ value, label }) => {
  return (
    <div className="stat-item">
      <h2>
        {/* O 'end' é o número final e 'duration' é o tempo da animação */}
        <CountUp end={value} duration={3} separator="." />
        <span className="plus-sign">+</span>
      </h2>
      <p>{label}</p>
    </div>
  );
};

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="stats-section" ref={ref}>
      {/* Só renderizamos os contadores quando a secção está visível */}
      {inView && (
        <div className="stats-container">
          <StatItem value={15} label="Anos no Mercado" />
          <StatItem value={40} label="Projetos Entregues" />
          <StatItem value={50} label="Milhões Investidos" />
        </div>
      )}
    </div>
  );
};

export default StatsSection;
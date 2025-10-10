// src/components/scenes/StatsScene.js
import React from 'react';
import CountUp from 'react-countup';
import './StatsScene.css';

const StatsScene = () => {
    return (
        <section id="stats-scene" className="scene stats-scene">
            <div className="stats-title">
                <h2>Nossa Plataforma em Números</h2>
                <p>Crescimento, performance e oportunidade em tempo real.</p>
            </div>
            <div className="stats-grid">
                <div className="stat-item">
                    <h3>$<CountUp end={80} duration={3} decimals={2} decimal="," separator="." prefix="" suffix="M" enableScrollSpy scrollSpyOnce /></h3>
                    <p>Receita Gerada</p>
                </div>
                <div className="stat-item">
                    <h3>+<CountUp end={500} duration={3} separator="." enableScrollSpy scrollSpyOnce /></h3>
                    <p>Afiliados na Rede</p>
                </div>
                <div className="stat-item">
                    <h3>+<CountUp end={45} duration={3} enableScrollSpy scrollSpyOnce /></h3>
                    <p>Obras em Andamento</p>
                </div>
            </div>
        </section>
    );
};
export default StatsScene;
// src/components/Preloader/Preloader.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Preloader.css';
import splashVideo from '../../assets/splash-video.mp4';

const loadingPhases = [
    { start: 0, text: "Analisando Oportunidades..." },
    { start: 30, text: "Estruturando Investimento..." },
    { start: 70, text: "Construindo Valor..." }
];

const Preloader = ({ onLoaded }) => {
    const [counter, setCounter] = useState(0);
    const [loadingText, setLoadingText] = useState(loadingPhases[0].text);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                if (prevCounter < 100) {
                    const newCounter = prevCounter + 1;
                    const currentPhase = loadingPhases.find(p => newCounter >= p.start && (!loadingPhases[loadingPhases.indexOf(p) + 1] || newCounter < loadingPhases[loadingPhases.indexOf(p) + 1].start));
                    if (currentPhase) {
                        setLoadingText(currentPhase.text);
                    }
                    return newCounter;
                } else {
                    clearInterval(interval);
                    setTimeout(onLoaded, 750); // Tempo extra para o utilizador ler "Construindo Valor..."
                    return 100;
                }
            });
        }, 30); // Aumentei um pouco a velocidade para compensar o tempo de leitura

        return () => clearInterval(interval);
    }, [onLoaded]);

    return (
        <motion.div 
            className="preloader-container"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
            <video src={splashVideo} autoPlay loop muted playsInline className="preloader-video-bg" />
            <div className="preloader-overlay" />
            <div className="preloader-content">
                <motion.div
                    className="preloader-logo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    CIG
                </motion.div>
                <motion.div
                    className="preloader-fullname"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    CONSTRUCTION INVESTMENT GROUP
                </motion.div>
                <div className="preloader-status">
                    <span className="status-text">{loadingText}</span>
                    <span className="status-counter">{counter}%</span>
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
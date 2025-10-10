// src/components/Preloader/Preloader.js

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Preloader.css';
import splashVideo from '../../assets/splash-video.mp4';

// ATUALIZADO: Importar o novo logótipo transparente
import logoImage from '../../assets/lion-broker-logo-transparent.png'; 

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
                    setTimeout(onLoaded, 750);
                    return 100;
                }
            });
        }, 30);

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
                    className="preloader-logo-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                >
                    <img src={logoImage} alt="Logótipo da Lion Broker" />
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
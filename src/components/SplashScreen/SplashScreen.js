// src/components/SplashScreen/SplashScreen.js
import React from 'react';
import { motion } from 'framer-motion';
import './SplashScreen.css';
import splashVideo from '../../assets/splash-video.mp4';

const SplashScreen = () => {
    return (
        <div className="splash-video-container">
            <video src={splashVideo} autoPlay loop muted playsInline />
            <div className="splash-overlay" />
            <div className="splash-content">
                <motion.div
                    className="splash-logo"
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                >
                    CIG
                </motion.div>
                <motion.div
                    className="splash-fullname"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.5 }} // Aparece 1s depois da sigla
                >
                    CONSTRUCTION INVESTMENT GROUP
                </motion.div>
            </div>
        </div>
    );
}

export default SplashScreen;
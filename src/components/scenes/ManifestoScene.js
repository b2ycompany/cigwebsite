// src/components/scenes/ManifestoScene.js
import React from 'react';
import manifestoVideo from '../../assets/manifesto-video.mp4'; // Adicione um vídeo de fundo

const ManifestoScene = () => {
    // ... (o código de split de texto permanece o mesmo)
    const text = "Nós não vendemos propriedades. Nós arquitetamos legados financeiros, esculpidos em concreto e visão.";
    const words = text.split(" ").map((word, index) => (
        <span key={index} className="manifesto-word-wrapper"><span className="manifesto-word">{word}</span></span>
    ));

    return (
        <section className="scene manifesto-scene">
            <video src={manifestoVideo} autoPlay loop muted className="background-video" />
            <div className="manifesto-text"><h2>{words}</h2></div>
        </section>
    );
};
export default ManifestoScene;
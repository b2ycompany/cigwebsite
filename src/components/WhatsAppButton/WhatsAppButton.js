// src/components/WhatsAppButton/WhatsAppButton.js
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
    // Substitua pelo seu número de telemóvel com o código do país (ex: 5511999998888)
    const phoneNumber = '5511999998888';
    const message = encodeURIComponent('Olá, tenho interesse em saber mais sobre as oportunidades de investimento.');

    return (
        <a 
            href={`https://wa.me/${phoneNumber}?text=${message}`} 
            className="whatsapp-button"
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
        >
            <FaWhatsapp />
        </a>
    );
};

export default WhatsAppButton;
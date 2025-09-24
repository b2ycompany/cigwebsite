// src/components/CustomCursor/CustomCursor.js

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap'; // Usamos o GSAP para uma animação de movimento suave
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Função que será chamada sempre que o rato se mover
    const onMouseMove = (event) => {
      // Usa o GSAP para animar a posição do nosso cursor personalizado
      // para as coordenadas do rato do sistema (event.clientX, event.clientY)
      gsap.to(cursorRef.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.4, // Duração curta para uma resposta rápida e fluida
        ease: 'power3.out' // Curva de animação para um movimento natural
      });
    };

    // Adiciona o "ouvinte" de eventos à janela do navegador
    window.addEventListener('mousemove', onMouseMove);

    // Função de "limpeza": remove o ouvinte quando o componente não for mais necessário
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []); // O array vazio [] significa que este efeito só corre uma vez (na montagem do componente)

  return <div className="custom-cursor" ref={cursorRef}></div>;
};

export default CustomCursor;
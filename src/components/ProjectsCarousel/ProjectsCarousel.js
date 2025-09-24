// src/components/ProjectsCarousel/ProjectsCarousel.js

import React from 'react';
// Importando Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// IMPORTAÇÃO ATUALIZADA: Adicionamos o módulo 'Mousewheel'
import { Navigation, Pagination, EffectCoverflow, Mousewheel } from 'swiper/modules';

// Importando os estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import './ProjectsCarousel.css'; // Nosso CSS personalizado

// Imagens para o carrossel
import aboutImage from '../../assets/about-image.jpg';
import project2Image from '../../assets/project2-image.jpg';

const projects = [
  { name: 'PROJETO OVERLOOK', img: aboutImage, type: 'Townhomes de Luxo' },
  { name: 'CIDADE JARDIM', img: project2Image, type: 'Residencial Vertical' },
  { name: 'VILA MADALENA', img: aboutImage, type: 'Uso Misto' },
  { name: 'LEBLON RESIDENCE', img: project2Image, type: 'Frente Mar' },
];

const ProjectsCarousel = () => {
  return (
    <div className="carousel-section">
      <h2 className="section-title">Projetos em Destaque</h2>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        // NOVA FUNCIONALIDADE: Ativa a navegação pela roda do rato
        mousewheel={true}
        // MÓDULO ATUALIZADO: Adicionamos o Mousewheel à lista de módulos
        modules={[EffectCoverflow, Pagination, Navigation, Mousewheel]}
        className="mySwiper"
      >
        {projects.map((p, i) => (
          <SwiperSlide key={i}>
            <img src={p.img} alt={p.name} />
            <div className="slide-info">
              <span>{p.type}</span>
              <h3>{p.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectsCarousel;
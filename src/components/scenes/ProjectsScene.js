// src/components/scenes/ProjectsScene.js

import React from 'react';
import aboutImage from '../../assets/about-image.jpg';
import project2Image from '../../assets/project2-image.jpg'; // Certifique-se de ter esta imagem

const ProjectsScene = () => {
  return (
    <section className="scene projects-scene">
      {/* Slide do Projeto 1 */}
      <div id="project-1" className="project-slide">
        <div className="project-image" style={{ backgroundImage: `url(${aboutImage})` }}></div>
        <div className="project-info">
          <h3>PROJETO OVERLOOK</h3>
          <p>$75M GDV</p>
        </div>
      </div>

      {/* Slide do Projeto 2 */}
      <div id="project-2" className="project-slide" style={{ opacity: 0 }}>
        <div className="project-image" style={{ backgroundImage: `url(${project2Image})` }}></div>
        <div className="project-info">
          <h3>CIDADE JARDIM</h3>
          <p>$120M GDV</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsScene;
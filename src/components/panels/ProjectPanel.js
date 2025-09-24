// src/components/panels/ProjectPanel.js
import React from 'react';

// Este componente agora pode receber 'props' para ser reutilizável
const ProjectPanel = ({ title, description, value }) => {
  return (
    <div className="panel text-panel">
      <div className="panel-content text-content-wrapper">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="project-value">{value}</div>
        <button className="cta-button">Explorar Projeto</button>
      </div>
    </div>
  );
};

export default ProjectPanel;
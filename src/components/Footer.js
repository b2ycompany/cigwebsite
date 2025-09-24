// src/components/Footer.js

import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>CIG - Construction Investment Group &copy; {currentYear}</p>
        <p>Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
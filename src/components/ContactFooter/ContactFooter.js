// src/components/ContactFooter/ContactFooter.js
import React from 'react';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import './ContactFooter.css';

const ContactFooter = () => {
    return (
        <footer className="contact-footer">
            <div className="footer-grid">
                <div className="footer-column brand-column">
                    <h3 className="footer-logo">CIG</h3>
                    <p>Construction Investment Group</p>
                    <div className="social-icons">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
                    </div>
                </div>
                <div className="footer-column">
                    <h4>Navegação</h4>
                    <ul>
                        <li><a href="/">Início</a></li>
                        <li><a href="/oportunidades">Oportunidades</a></li>
                        <li><a href="/contacto">Contacto</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Contacto</h4>
                    <p>Av. Paulista, 171, 4º andar<br/>Bela Vista, São Paulo - SP<br/>CEP: 01311-000</p>
                    <p>invest@cigroup.com</p>
                </div>
                <div className="footer-column form-column">
                    <h4>Seja um Investidor</h4>
                    <form>
                        <input type="email" placeholder="O seu melhor e-mail" />
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
            {/* A SECÇÃO DO MAPA RESTAURADA */}
            <div className="footer-map">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1455201659563!2d-46.6565345844063!3d-23.56291916751287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0x2025d5e1a72d794e!2sAv.%20Paulista%2C%20171%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001311-000!5e0!3m2!1spt-BR!2sbr!4v1678886512345!5m2!1spt-BR!2sbr" 
                    width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localização CIG">
                </iframe>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Construction Investment Group. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default ContactFooter;
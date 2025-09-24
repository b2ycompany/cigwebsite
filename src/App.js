// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Preloader from './components/Preloader/Preloader'; // NOVO PRELOADER
import ContactFooter from './components/ContactFooter/ContactFooter'; // NOVO RODAPÉ
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'; // NOVO BOTÃO
import HomePage from './pages/HomePage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import ContactPage from './pages/ContactPage';
import CustomCursor from './components/CustomCursor/CustomCursor';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      // Simula o fim do carregamento da página. Numa app real, isto seria acionado
      // pelo evento 'window.onload' ou após o carregamento de imagens importantes.
      console.log('App montada, Preloader irá correr.');
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onLoaded={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <Router> {/* Router deve envolver a App para o Navbar e Footer funcionarem */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/oportunidades" element={<OpportunitiesPage />} />
                  <Route path="/contacto" element={<ContactPage />} />
                </Routes>
              </main>
              <ContactFooter />
              <WhatsAppButton />
          </motion.div>
        </Router>
      )}
    </>
  );
}
export default App;
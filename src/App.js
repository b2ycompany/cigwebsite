// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes Principais
import Navbar from './components/Navbar';
import Preloader from './components/Preloader/Preloader';
import ContactFooter from './components/ContactFooter/ContactFooter';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import CustomCursor from './components/CustomCursor/CustomCursor';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas da Aplicação
import HomePage from './pages/HomePage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AffiliateDashboard from './pages/AffiliateDashboard';

// Estilos Globais
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      console.log('App montada, Preloader irá correr.');
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onLoaded={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <Router>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Navbar />
              <main className="main-content">
                <Routes>
                  {/* === Rotas Públicas === */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/oportunidades" element={<OpportunitiesPage />} />
                  <Route path="/contacto" element={<ContactPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />

                  {/* === Rotas Protegidas === */}
                  {/* Rota do Administrador */}
                  <Route 
                    path="/admin" 
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    } 
                  />
                  
                  {/* Rota do Afiliado */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <AffiliateDashboard />
                      </ProtectedRoute>
                    } 
                  />
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
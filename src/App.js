// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes
import Navbar from './components/Navbar';
import Preloader from './components/Preloader/Preloader';
import ContactFooter from './components/ContactFooter/ContactFooter';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas
import HomePage from './pages/HomePage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AffiliateDashboard from './pages/AffiliateDashboard';

// Páginas de Onboarding
import OnboardingLayout from './pages/OnboardingLayout';
import PersonalStep from './pages/PersonalStep';
import AddressStep from './pages/AddressStep';
import DocumentsStep from './pages/DocumentsStep';

// Estilos Globais
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      console.log('App montada, Preloader irá correr.');
  }, []);

  return (
    <>
      {/* O CustomCursor foi removido daqui */}
      
      <AnimatePresence>
        {loading && <Preloader onLoaded={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <Router>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Navbar />
              <main className="main-content">
                <Routes>
                  {/* Rotas Públicas */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/oportunidades" element={<OpportunitiesPage />} />
                  <Route path="/contacto" element={<ContactPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />

                  {/* Rotas Protegidas */}
                  <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><AffiliateDashboard /></ProtectedRoute>} />

                  {/* Rotas de Onboarding Aninhadas */}
                  <Route path="/onboarding" element={<ProtectedRoute><OnboardingLayout /></ProtectedRoute>}>
                    <Route path="personal" element={<PersonalStep />} />
                    <Route path="address" element={<AddressStep />} />
                    <Route path="documents" element={<DocumentsStep />} />
                  </Route>

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
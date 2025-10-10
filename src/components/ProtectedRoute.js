// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>A carregar...</div>;
    }

    if (user) {
        // Se o utilizador está logado, mostra a página
        return children;
    }

    // Se não, redireciona para a página de login
    return <Navigate to="/login" />;
};

export default ProtectedRoute;
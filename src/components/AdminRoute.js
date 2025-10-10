// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { user, userRole, loading } = useAuth();

    if (loading) {
        // Pode substituir por um spinner de carregamento mais elegante
        return <div>Verificando permissões...</div>;
    }

    if (user && userRole === 'admin') {
        // Se o utilizador está logado E tem o papel de 'admin', mostra a página
        return children;
    }

    // Se não, redireciona para a página de login
    return <Navigate to="/login" />;
};

export default AdminRoute;
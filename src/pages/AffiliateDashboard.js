// src/pages/AffiliateDashboard.js
import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Usaremos o hook para obter os dados do utilizador
import './AuthPages.css';

const AffiliateDashboard = () => {
    const { user, userData, loading } = useAuth();

    if (loading) {
        return <div className="auth-container"><p>A carregar dados...</p></div>;
    }

    return (
        <div className="auth-container">
            <div className="auth-form" style={{ maxWidth: '800px' }}>
                <h1 className="auth-title">Painel do Parceiro</h1>
                {userData && (
                    <>
                        <p>Olá, {userData.name}. Bem-vindo à sua área restrita.</p>
                        {userData.status === 'pending' && (
                            <div className="status-pending">
                                <h3>O seu cadastro está em análise.</h3>
                                <p>Por favor, aguarde a aprovação de um administrador para ter acesso completo às oportunidades.</p>
                            </div>
                        )}
                        {userData.status === 'approved' && (
                            <div className="status-approved">
                                <h3>Cadastro Aprovado!</h3>
                                <p>Você já pode visualizar todas as nossas oportunidades de investimento.</p>
                                {/* Aqui entrará a lista de projetos para o afiliado */}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
export default AffiliateDashboard;
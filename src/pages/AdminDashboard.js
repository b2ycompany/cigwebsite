// src/pages/AdminDashboard.js
import React from 'react';
import './AuthPages.css';

const AdminDashboard = () => {
    return (
        <div className="auth-container">
            <div className="auth-form" style={{ maxWidth: '800px' }}>
                <h1 className="auth-title">Painel do Administrador</h1>
                <p>Bem-vindo, Administrador. Aqui você irá gerir os associados e as oportunidades.</p>
                {/* No próximo passo, adicionaremos a lista de utilizadores aqui */}
            </div>
        </div>
    );
};
export default AdminDashboard;
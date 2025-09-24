// src/pages/LoginPage.js
import React, { useState } from 'react';
import { signInUser } from '../firebaseAuth';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const result = await signInUser(email, password);
        if (result.success) {
            // No próximo passo, redirecionaremos para o painel correto (afiliado ou admin)
            navigate('/'); // Por agora, volta para a home
        } else {
            setError('E-mail ou palavra-passe inválidos.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1 className="auth-title">Acesso de Parceiros</h1>
                <p>Faça login para visualizar os seus investimentos.</p>
                <form onSubmit={handleLogin}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Palavra-passe" required />
                    <button type="submit" className="auth-button">Entrar</button>
                    {error && <p className="auth-error">{error}</p>}
                </form>
            </div>
        </div>
    );
};
export default LoginPage;
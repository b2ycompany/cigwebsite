// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { signUpAffiliate } from '../firebaseAuth';
import { useNavigate } from 'react-router-dom';
// CORREÇÃO: Importando o ficheiro de estilo correto
import './RegisterPage.css';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        const result = await signUpAffiliate(name, email, password);
        if (result.success) {
            navigate('/onboarding/personal');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1 className="auth-title">Seja Nosso Parceiro</h1>
                <p>Crie a sua conta para iniciar o processo de afiliação.</p>
                <form onSubmit={handleRegister}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome Completo" required />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required />
                    <input type="password" minLength="6" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Palavra-passe (mín. 6 caracteres)" required />
                    <button type="submit" className="auth-button">Criar Conta e Continuar</button>
                    {error && <p className="auth-error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;